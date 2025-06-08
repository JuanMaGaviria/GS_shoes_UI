import ActionButton from "../../core/ActionButton/components/ActionButton";

export const columnasGenerales = (handleDetails, handleEdit, handleToggleStatus, handleDelete) => [
    { header: 'Fecha movimiento', accessor: 'fecha_movimiento' },
    { header: 'Cantidad', accessor: 'cantidad' },
    { header: 'Descripción', accessor: 'descripcion' },
    { header: 'Precio total', accessor: 'precio_total' },

    {
        header: "Acciones",
        accessor: 'acciones',
        Cell: ({ row }) => (
            <div className="flex justify-center">
                <ActionButton
                    text=""
                    color="#2d68ac0"
                    textColor="#2d68ac"
                    size="small_icon"
                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M7 7H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0-2.97-2.97L9 12v3h3zM16 5l3 3" /></g></svg>}
                    onClick={() => handleEdit(row)}
                    customStyles={{ fontWeight: '400', marginRight: '10px' }}
                />
              
                
            </div>
        )
    },
];