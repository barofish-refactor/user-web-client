import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import type { ChartOptions } from 'chart.js';
import { type ProductTastingNoteResponse } from 'src/api/swagger/data-contracts';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

interface Props {
  data: ProductTastingNoteResponse[];
}

const Chat = ({ data }: Props) => {
  const bgArr = ['rgb(91 131 255 / 0.8)', 'rgb(147 112 219/ 0.8)'];

  const chartData = data.map((item, idx) => {
    return {
      label: '',
      data: item?.tastes?.map(item => item.score) ?? [],
      backgroundColor: bgArr[idx] ?? 'gray',
      borderColor: bgArr[idx] ?? 'gray',
      color: '#333333',
      fill: true, // 영역을 채우도록 설정
    };
  });

  const labelName = data.map((item: any) =>
    item?.tastes?.map((item2: { taste: string }) => {
      let itemName;
      if (item2.taste === 'taste1') return (itemName = '기름진맛');
      if (item2.taste === 'taste2') return (itemName = '단맛');
      if (item2.taste === 'taste3') return (itemName = '담백한맛');
      if (item2.taste === 'taste4') return (itemName = '감칠맛');
      if (item2.taste === 'taste5') return (itemName = '짠맛');

      return itemName;
    }),
  );

  const chartProps = {
    labels: labelName[0],
    datasets: chartData ?? '',
  };

  const chartOptions: ChartOptions<'radar'> & ChartOptions<any> = {
    elements: {
      // 데이터 속성.
      line: {
        borderWidth: 1,
        // borderColor: '#dcdcdc',
      },
      // 데이터 꼭짓점.
      point: {
        backgroundColor: 'transparent',
        pointStyle: 'cross',
      },
    },
    scales: {
      r: {
        ticks: {
          stepSize: 5,
          display: false,
          color: '#000000',
          // backdropColor: 'red',
        },
        grid: {
          color: '#000000',
        },
        // 라벨 속성 지정.
        pointLabels: {
          font: {
            size: 14,
            weight: '500',
            family: 'Pretendard',
          },
          color: 'black',
          finally: 'Pretendard',
        },
        angleLines: {
          display: true,
          lineWidth: 1,
          color: '#000000',
        },
        suggestedMin: 0,
        suggestedMax: 10,
      },
    },
    // 위에 생기는 데이터 속성 label 타이틀을 지워줍니다.
    plugins: {
      legend: {
        // type !== 'product'
        display: false,
        lables: {
          finally: 'Pretendard',
        },
      },
      filler: {
        propagate: false, // 영역을 서로 독립적으로 채우도록 설정
      },
    },
    // 기본 값은 가운데에서 펴져나가는 애니메이션 형태입니다.
    animation: {
      duration: 1,
    },
  };
  // className='bg-[#ffffff]'
  return (
    <div style={{ margin: '0 auto', width: '250px', height: '250px' }}>
      <Radar data={chartProps} options={chartOptions} />
    </div>
  );
};

export default Chat;
