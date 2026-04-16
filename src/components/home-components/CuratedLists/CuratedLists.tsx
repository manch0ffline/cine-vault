import SectionBlock from "@/src/components/SectionBlock/SectionBlock";
import Image from "next/image";
import { data } from "./data";

function CuratedLists() {
  return (
    <section id="curated">
      <SectionBlock
        className="curated-lists"
        title="Director's Selection"
        sectionName="Curated"
      >
        <div className="curated-lists__content">
          {data.map((item) => (
            <div
              key={item.id}
              className="curated-lists__item d-flex flex-column gap-3"
            >
              <div className="curated-lists__image">
                <Image
                  src={`/images/${item.image}`}
                  alt={item.title}
                  fill
                  style={{ objectFit: "cover" }}
                />
                <span className="curated-lists__rating">{item.rating}</span>
              </div>
              <div className="d-flex flex-column gap-1">
                <div className="d-flex gap-2 align-items-center">
                  <span className="curated-lists__detail">{item.genre}</span>
                  <span className="curated-lists__detail">{item.year}</span>
                </div>
                <h4>{item.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </SectionBlock>
    </section>
  );
}

export default CuratedLists;
