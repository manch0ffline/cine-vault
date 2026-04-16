import Logo from "@/src/components/Logo/logo";
import SectionBlock from "@/src/components/SectionBlock/SectionBlock";
import Link from "next/link";

// Приводим все данные к единому формату: массив объектов { title, link }
const data = [
  {
    title: "Browse",
    description: [
      { title: "Features", link: "#features" },
      { title: "Curated", link: "#curated" },
      { title: "Ready to Start", link: "#ready-to-start" },
    ],
  },
  {
    title: "Community",
    description: [
      { title: "Forum", link: "/" },      // замените на реальные ссылки
      { title: "Cinephile Blog", link: "/" },
      { title: "Events", link: "/" },
    ],
  },
  {
    title: "Support",
    description: [
      { title: "Help Center", link: "/" },
      { title: "Terms of Service", link: "/" },
      { title: "Privacy Policy", link: "/" },
      { title: "Contact Us", link: "/" },
    ],
  },
];

function Footer() {
  return (
    <footer className="footer">
      <SectionBlock dark padding="20px 40px 50px">
        <div className="row g-4">
          <div className="footer__company-info d-flex flex-column gap-3 col-12 col-md-3">
            <Logo size="16px" />
            <p>
              Curating the art of cinema. Discover the extraordinary in every
              frame.
            </p>
            <div className="footer__contact-links d-flex align-items-center gap-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className={`icon comp-icon-${index + 1}`}
                  style={{ cursor: "pointer" }}
                ></div>
              ))}
            </div>
          </div>
          {data.map((section, index) => (
            <div
              key={index}
              className="footer__links d-flex flex-column col-6 col-md-3 gap-3" // убрал лишний gap-2
            >
              <h4 className="m-0">{section.title}</h4>
              <div className="d-flex flex-column gap-1">
                {section.description.map((item, idx) => (
                  <Link key={idx} className="m-0" href={item.link}>
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SectionBlock>
    </footer>
  );
}

export default Footer;