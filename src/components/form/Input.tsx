type Props = {
  type: string
  placeholder: string
  name: string
  title?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function Input({ type, placeholder, name, title, value, onChange }: Props) {
  return (
    <label htmlFor={name} className="my-input d-flex flex-column gap-1">
      {title && <span className="text-uppercase my-input__title">{title}</span>}
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        id={name}
        className="my-input__input"
        value={value}
        onChange={onChange}
      />
    </label>
  )
}

export default Input
