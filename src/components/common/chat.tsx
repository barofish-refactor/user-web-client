import React from 'react';
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

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

interface Props {
  data:
    | {
        tastes: {
          taste: string;
          score: number | string;
        }[];
        textures: {
          texture: string;
          score: number;
        }[];
        recommendedCookingWay: string;
        difficultyLevelOfTrimming: string;
        theScentOfTheSea: string;
      }[]
    | any;
}

const Chat = ({ data }: Props) => {
  const bgArr = ['rgb(91 131 255 / 0.8)', 'rgb(132 158 230 / 0.8)'];

  const chartData = data.map((item: { tastes: { score: number }[] }, idx: number) => {
    return {
      label: '',
      data: item?.tastes?.map((item: { score: number }) => item.score) ?? [],
      backgroundColor: bgArr[idx] ?? 'gray',
    };
  });
  const labelName = data.map((item: any) =>
    item?.tastes?.map((item2: any) => {
      let itemName;
      if (item2.taste === 'taste1') return (itemName = '기름진맛');
      if (item2.taste === 'taste2') return (itemName = '단맛');
      if (item2.taste === 'taste3') return (itemName = '담백한맛');
      if (item2.taste === 'taste4') return (itemName = '감칠맛');
      if (item2.taste === 'taste5') return (itemName = '짠맛');

      // if (item2.taste === 'oily') return (itemName = '기름진맛');
      // if (item2.taste === 'sweet') return (itemName = '단맛');
      // if (item2.taste === 'lightTaste') return (itemName = '담백한맛');
      // if (item2.taste === 'umami') return (itemName = '감칠맛');
      // if (item2.taste === 'salty') return (itemName = '짠맛');
      return itemName;
    }),
  );

  const chartProps = {
    labels: labelName[0],
    datasets: chartData ?? '',
  };

  const chartOptions: ChartOptions<'radar'> & ChartOptions = {
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
          color: '#dcdcdc',
          backdropColor: '#dcdcdc',
        },

        grid: {
          color: 'gray',
        },
        // 라벨 속성 지정.
        pointLabels: {
          font: {
            size: 14,
            weight: '700',
            family: 'Pretendard',
          },
          // color: 'black',
        },
        angleLines: {
          display: true,
          lineWidth: 1,
          color: 'gray',
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
      },
    },
    // 기본 값은 가운데에서 펴져나가는 애니메이션 형태입니다.
    animation: {
      duration: 1,
    },
  };
  return (
    <div style={{ margin: '0 auto', width: '250px', height: '250px' }}>
      <Radar data={chartProps} options={chartOptions} />
    </div>
  );
};

export default Chat;
