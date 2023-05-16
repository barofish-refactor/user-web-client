import { ProductReviewChart, ProductReviewPhoto } from 'src/components/product';

const Review = () => {
  return (
    <div className=''>
      {/* 구매자들의 솔직 리뷰 */}
      <ProductReviewChart
        data={{
          totalCount: 129,
          taste: 30,
          freshness: 12,
          price: 21,
          packaging: 39,
          size: 27,
        }}
      />
      {/* 사진 후기 */}
      <div className='h-2 bg-grey-90' />
      <ProductReviewPhoto />
    </div>
  );
};

export default Review;
