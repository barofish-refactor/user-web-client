import dynamic from 'next/dynamic';

const ResponsiveRadar = dynamic(() => import('@nivo/radar').then(m => m.ResponsiveRadar), {
  ssr: false,
});

export const MyResponsiveRadar = ({ data /* see data tab */ }: any) => {
  return (
    <div style={{ width: '100%', height: '300px', fontSize: '12px' }}>
      <ResponsiveRadar
        data={data}
        keys={['맛']}
        indexBy='taste'
        valueFormat='>-.2f'
        margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
        // borderColor={{ from: 'color' }}
        borderColor='red'
        gridLabelOffset={36}
        dotSize={10}
        dotColor={{ theme: 'background' }}
        dotBorderWidth={2}
        // colors={{ scheme: 'accent' }}
        colors='gray'
        blendMode='multiply'
        motionConfig='wobbly'
        theme={{
          legends: {
            text: {
              fontSize: 30,
            },
          },
        }}
        // legends={[
        //   {
        //     anchor: 'top-left',
        //     direction: 'column',
        //     translateX: -50,
        //     translateY: -40,
        //     itemWidth: 80,
        //     itemHeight: 20,
        //     itemTextColor: '#8e1bae',
        //     symbolSize: 12,
        //     symbolShape: 'circle',
        //     effects: [
        //       {
        //         on: 'hover',
        //         style: {
        //           itemTextColor: '#d24646',
        //         },
        //       },
        //     ],
        //   },
        // ]}
      />
    </div>
  );
};
