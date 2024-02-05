import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function DragVehiculo({ vehiculo }) {

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: vehiculo._id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="card bg-body rounded my-2 px-4"
    >
      <div className="row justify-content-center align-items-center">
        <div className="col-3 text-center">
          <img
            src={vehiculo.imagen_principal.url}
            alt="imagen"
            style={{
              objectFit: "cover",
              width: "100%",
              maxHeight: "80px",
            }}
          />
        </div>
        <div className="col-9 my-1">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h6 className="card-title">{vehiculo.nombre}</h6>
              <p className="card-text">{vehiculo.descripcion}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DragVehiculo;