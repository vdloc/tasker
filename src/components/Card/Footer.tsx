import React from "react";
import Button from "../Button";
import { useStore } from "@/store";

const CardFooter = React.memo(function CardFooter() {
  const toggleTagsListEditDialog = useStore(
    (state) => state.toggleTagsListEditDialog
  );
  const isTagsListEditDialogOpen = useStore(
    (state) => state.isTagsListEditDialogOpen
  );

  function handleEditTagsButtonClick() {
    toggleTagsListEditDialog(!isTagsListEditDialogOpen);
  }

  return (
    <div className="px-4 py-4 sm:px-6">
      <div className="flex gap-4 justify-end">
        <Button
          label="Edit Tags"
          size="large"
          rounded={true}
          onClick={handleEditTagsButtonClick}
        />
        <Button label="Completed Tasks" size="large" rounded={true} />
      </div>
    </div>
  );
});

export default CardFooter;
