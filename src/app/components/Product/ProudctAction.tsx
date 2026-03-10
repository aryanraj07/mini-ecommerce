import React from "react";
import WishlistButton from "../common/WishlistButton";
interface ProductActionProps {
  id: number;
  thumbnail: string | null;
}
const ProudctAction = ({ id, thumbnail }: ProductActionProps) => {
  return (
    <>
      <WishlistButton id={id} image={thumbnail} />
    </>
  );
};

export default ProudctAction;
