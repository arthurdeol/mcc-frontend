import { Container } from "./styles";
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

import ColumnForPraiseCard from "../../components/ColumnForPraiseCard";

export default function ServicePraisesList() {
  const [servicePraises, setServicePraises] = useState(() => {
    const praisesSelected = localStorage.getItem("servicePraisesList");
    if (praisesSelected) {
      return JSON.parse(praisesSelected);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("servicePraisesList", JSON.stringify(servicePraises));
  }, [servicePraises]);

  const getPraisesPos = (id) =>
    servicePraises.findIndex((praise) => praise.songBookMapId === id);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id === over.id) return;

    setServicePraises((servicePraises) => {
      const originalPos = getPraisesPos(active.id);
      const newPos = getPraisesPos(over.id);
      return arrayMove(servicePraises, originalPos, newPos);
    });
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor, useSensor(KeyboardSensor), {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <Container>
      <Header />
      <div className="main-container">
        <div className="box">
          <DndContext
            sensors={sensors}
            onDragEnd={handleDragEnd}
            collisionDetection={closestCorners}
          >
            <ColumnForPraiseCard servicePraises={servicePraises} />
          </DndContext>
        </div>
      </div>
    </Container>
  );
}
