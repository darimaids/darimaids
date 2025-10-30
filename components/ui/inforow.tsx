export const InfoRow = ({
  label,
  value,
}: {
  label: string;
  value?: string | number;
}) => (
  <div className="flex justify-between">
    <span className="text-gray-600 dark:text-gray-400">{label}</span>
    <span className="font-medium text-right max-w-[300px] wrap-break-words">
      {value || "N/A"}
    </span>
  </div>
);