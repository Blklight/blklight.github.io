export const DocumentHeader = ({
  department,
  isHighSecurity = false,
}: {
  department: string;
  isHighSecurity?: boolean;
}) => {
  return (
    <div className="flex flex-col gap-0.5 dark:bg-[#eaeaea] bg-[#252525] background-texture texture-item p-4 mb-3 text-center font-mono">
      <div className="text-lg font-bold dark:text-[#121212] text-[#eaeaea] uppercase">
        República da Aurora
      </div>
      <div className="text-sm font-bold dark:text-[#121212] text-[#eaeaea] uppercase">
        DEPARTAMENTO DE GESTÃO DE ATIVOS ESPECIAIS
      </div>
    </div>
  );
};
