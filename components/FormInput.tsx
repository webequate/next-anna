// components/FormInput.tsx
interface FormInputProps {
  inputLabel: string;
  labelFor: string;
  inputType: string;
  inputId: string;
  inputName: string;
  placeholderText: string;
  ariaLabelName: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
};

const FormInput:React.FC<FormInputProps> = ({ inputLabel, labelFor, inputType, inputId, inputName, placeholderText, ariaLabelName, onChange, value }) => {
	return (
		<div className="font-general-regular mb-4">
			<label
				className="block text-lg text-secondary-dark dark:text-secondary-light mb-1"
				htmlFor={labelFor}
			>
				{inputLabel}
			</label>
			<input
				className="w-full px-5 py-2 border text-secondary-dark dark:text-secondary-light bg-white dark:bg-black border-secondary-dark dark:border-secondary-light rounded-md shadow-sm text-md"
				type={inputType}
				id={inputId}
				name={inputName}
				placeholder={placeholderText}
				aria-label={ariaLabelName}
        onChange={onChange}
        value={value}
				required
			/>
		</div>
	);
};

export default FormInput;