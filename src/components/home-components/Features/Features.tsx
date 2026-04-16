import SectionBlock from "@/src/components/SectionBlock/SectionBlock";
import { data } from "./data";

function Features() {
  return (
    <section id='features'>
      <SectionBlock
        dark={true}
        sectionName="Features"
        title="Precision Tools for Cinephiles"
        className="features"
      >
        <div className="features__blocks row g-4">
          {data.map((item, index) => (
            <div key={index} className="col-12 col-md-6 col-lg-4">
              <div className="features__block d-flex flex-column gap-3 h-100">
                <div className="features__icon-block">
                  <div className={`icon ${item.icon}`}></div>
                </div>
                <h4 className="m-0">{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionBlock>
    </section>
  );
}

export default Features;
