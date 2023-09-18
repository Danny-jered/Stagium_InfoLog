export const agentColums = [
    {
        field: "agent",
        headerName: "AGENT",
        width: 300,
        valueGetter: (params) => `${params.row.nom}, ${params.row.prenom}`,
    },
    { field: "email", headerName: "Courriel", width: 300 },
    { field: "telephone", headerName: "Télephone", width: 300 },
    {
        field: "statut",
        headerName: "Statut",
        width: 210,
        renderCell: (params) => {
            return (
                <div className={`cell-status-${params.row.statut}`}>
                    {params.row.statut}
                </div>
            );
        },
    },
];
