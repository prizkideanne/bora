function CreateArticleField({ formik, fieldName, placeholder, title }) {
  return (
    <div className="flex flex-row items-center mb-10">
      <label className="w-[200px] font-medium text-[20px]">{title}</label>
      <input
        type="text"
        {...formik.getFieldProps(fieldName)}
        className="text-[20px] px-4 py-2 w-full rounded-md"
        placeholder={placeholder}
      />
    </div>
  );
}

export default CreateArticleField;
