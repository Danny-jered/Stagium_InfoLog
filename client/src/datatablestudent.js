export const studentColums = [
    {
        field: "etudiant",
        headerName: "Étudiant",
        minWidth: 300,
        flex: 1,
        valueGetter: (params) => `${params.row.nom}, ${params.row.prenom}`,
    },
    { field: "email", headerName: "Courriel", minWidth: 300, flex: 1 },
    { field: "telephone", headerName: "Télephone", minWidth: 300, flex: 1 },
    {
        field: "statut",
        headerName: "Statut",
        minWidth: 210,
        flex: 1,
        renderCell: (params) => {
            /* solution temporaire */
            return (
                <div>
                    {params.row.stages.length === 0 ? "non placé" : "placé"}
                </div>
            );
        },
    },
];
