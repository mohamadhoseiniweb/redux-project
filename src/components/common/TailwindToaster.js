import { Toaster, ToastIcon, resolveValue } from "react-hot-toast";

const TailwindToaster = () => {
  return (
    <Toaster>
      {(t) => (
        <div
          appear
          show={t.visible}
          className="transform p-4 flex bg-white rounded shadow-lg"
          enter="transition-all duration-150"
          enterFrom="opacity-0 scale-50"
          enterTo="opacity-100 scale-100"
          leave="transition-all duration-150"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-75"
        >
          <ToastIcon toast={t} />
          <p
            class="px-2 text-sm"
            dangerouslySetInnerHTML={{ __html: resolveValue(t.message) }}
          ></p>
        </div>
      )}
    </Toaster>
  );
};

export default TailwindToaster;
