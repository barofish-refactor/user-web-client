import dynamic from 'next/dynamic';

const ResponsiveBar = dynamic(() => import('@nivo/bar').then(m => m.ResponsiveBar), {
  ssr: false,
});

export const MyResponsiveBar = ({ data /* see data tab */ }: any) => {
  return (
    <div style={{ height: '300px' }}>
      <ResponsiveBar
        data={data}
        keys={['단단함', '쫄깃함', '바스러짐', '아삭', '찰짐', '기본']}
        indexBy='texture'
        margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'nivo' }}
        // colors='red'
        axisTop={null}
        axisRight={null}
        labelSkipWidth={12}
        labelSkipHeight={12}
        role='application'
        ariaLabel='Nivo bar chart'
        barAriaLabel={e => e.id + ': ' + e.formattedValue + ' in texture: ' + e.indexValue}
        defs={[
          {
            id: 'dots',
            type: 'patternDots',
            background: 'inherit',
            // color: '#949e9d',
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            // color: '#c0b66d',
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: 'fries',
            },
            id: 'dots',
          },
          {
            match: {
              id: 'sandwich',
            },
            id: 'lines',
          },
        ]}
        borderColor={{
          from: 'color',
          modifiers: [['darker', 1.6]],
        }}
        axisBottom={{
          // 하단 이름
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: '식감',
          legendPosition: 'middle',
          legendOffset: 32,
        }}
        labelTextColor={{
          from: 'color',
          modifiers: [['darker', 1.6]],
        }}
        // legends={[
        //   {
        //     dataFrom: 'keys',
        //     anchor: 'bottom-right',
        //     direction: 'column',
        //     justify: false,
        //     translateX: 120,
        //     translateY: 0,
        //     itemsSpacing: 2,
        //     itemWidth: 100,
        //     itemHeight: 20,
        //     itemDirection: 'left-to-right',
        //     itemOpacity: 0.85,
        //     symbolSize: 20,
        //     effects: [
        //       {
        //         on: 'hover',
        //         style: {
        //           itemOpacity: 1,
        //         },
        //       },
        //     ],
        //   },
        // ]}
      />
    </div>
  );
};
