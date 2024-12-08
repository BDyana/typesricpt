import PriceFilter from './price-filter';

interface IProps {
  slug: string;
  isSearch: boolean;
}
export default function Filters({ slug, isSearch }: IProps) {
  return (
    <div className="">
      <PriceFilter slug={slug} isSearch={isSearch} />
    </div>
  );
}
