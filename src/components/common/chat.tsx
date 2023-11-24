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
  data: {
    tastes: {
      taste: string | undefined;
      score: number | string | undefined;
    }[];
    textures: {
      texture: string | undefined;
      score: number | string | undefined;
    }[];
    recommendedCookingWay: string | undefined;
    difficultyLevelOfTrimming: string | undefined;
    theScentOfTheSea: string | undefined;
  }[];
}

const Chat = ({ data }: Props) => {
  const bgArr = ['rgb(23 68 191 / 0.8)', 'rgb(132 158 230 / 0.8)'];

  const chartData = data.map((item, idx) => {
    return {
      label: '',
      data: item.tastes.map(item => item.score),
      backgroundColor: bgArr[idx] ?? 'gray',
    };
  });
  const labelName = data.map(item => item.tastes.map(item2 => item2.taste));
  const chartProps = {
    labels: labelName[0],
    datasets: chartData,
  };
  // console.log(labelName);

  const chartOptions: ChartOptions<'radar'> & ChartOptions = {
    elements: {
      // 데이터 속성.
      line: {
        borderWidth: 1,
        borderColor: '#dcdcdc',
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
