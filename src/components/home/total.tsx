import type { FC } from "react";

interface Props {
  totalCount: number;
  filtredCount: number;
}

const Total: FC<Props> = ({ totalCount, filtredCount }) => {
  return (
    <div className="mt-8 text-text-secondary text-sm flex justify-between items-center">
      <div>
        {" "}
        <span className="text-text-primary">{filtredCount}</span> not
        gösteriliyor toplam (
        <span className="text-text-primary">{totalCount}</span>)
      </div>
    </div>
  );
};

export default Total;
