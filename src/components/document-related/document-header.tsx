export const DocumentHeader = ({
  department,
  isHighSecurity = false,
}: {
  department: string;
  isHighSecurity?: boolean;
}) => {
  return (
    <div className="flex flex-col gap-0.5 bg-primary background-texture texture-item p-4 mb-3 text-center font-mono">
      <div className="text-lg font-bold text-primary-foreground uppercase">
        República da Aurora
      </div>
      <div className="text-sm font-bold text-primary-foreground uppercase">
        DEPARTAMENTO DE GESTÃO DE ATIVOS ESPECIAIS
      </div>
    </div>
  );
};
