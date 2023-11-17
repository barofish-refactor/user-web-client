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
  datasets: {
    id: number;
    label: string;
    title: string[];
    data: number[];
  }[];
  type: string;
}

const Chat = ({ datasets, type }: Props) => {
  const bgArr = ['rgb(23 68 191 / 0.9)', 'rgb(132 158 230 / 0.9)'];
  const chartData = datasets.map((item, idx) => {
    return {
      label: item.label,
      data: item.data.map(data => data),
      backgroundColor: bgArr[idx] ?? 'gray',
    };
  });
  const chartProps = {
    labels: datasets[0].title,
    datasets: chartData,
  };

  const chartOptions: ChartOptions<'radar'> & ChartOptions = {
    elements: {
      // 데이터 속성.
      line: {
        borderWidth: 1,
        borderColor: '#dcdcdc',
      },
      // 데이터 꼭짓점.
      point: {
        backgroundColor: 'gray',
      },
    },
    scales: {
      r: {
        ticks: {
          stepSize: 2.5,
          display: true,
        },
        grid: {
          color: 'gray',
        },
        // 라벨 속성 지정.
        pointLabels: {
          font: {
            size: 10,
            weight: '700',

            family: 'Pretendard',
          },
          color: 'grey',
        },
        angleLines: {
          display: false,
        },
        suggestedMin: 0,
        suggestedMax: 10,
      },
    },
    // 위에 생기는 데이터 속성 label 타이틀을 지워줍니다.
    plugins: {
      legend: {
        display: type !== 'product',
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
