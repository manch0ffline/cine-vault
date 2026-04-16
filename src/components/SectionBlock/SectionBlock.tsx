type Props = {
  children: React.ReactNode;
  dark?: boolean;
  sectionName?: string;
  title?: string;
  className?: string;
  container?: boolean;
  padding?: string;
};

function SectionBlock({
  children,
  dark = false,
  sectionName,
  title,
  className,
  container = true,
  padding = "128px 40px",
}: Props) {
  return (
    <div
      className={`section-block ${dark ? "dark" : ""} w-100 ${className || ""}`}
    >
      <div className={` ${container ? "container" : ""}`} style={{
        padding: padding
      }}>
        <div className="d-flex flex-column gap-2">
          {sectionName && (
            <h3 className="section-block__name m-0">{sectionName}</h3>
          )}
          {title && <h2 className="section-block__title m-0 mb-5">{title}</h2>}
        </div>
        {children}
      </div>
    </div>
  );
}

export default SectionBlock;
