import PraiseCard from "../../components/PraiseCard";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState, useEffect } from "react";

export default function ColumnForPraiseCard({ servicePraises }) {
  //   const deletePraiseFromServiceList = (praiseId) => {
  //     setServicePraises(
  //       servicePraises.filter((praise) => praise.songBookMapId !== praiseId)
  //     );
  //   };

  return (
    <>
      <SortableContext
        items={servicePraises}
        strategy={verticalListSortingStrategy}
      >
        {servicePraises.map((praise) => (
          <PraiseCard
            praise={praise}
            id={praise.songBookMapId}
            key={praise.songBookMapId}
          />
        ))}
      </SortableContext>
    </>
  );
}
