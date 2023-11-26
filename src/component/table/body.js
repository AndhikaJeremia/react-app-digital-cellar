const BodyTable = ({ data, handleModalForm }) => {
    // console.log(data)
    return (
        <tbody>
            {data?.length !== 0? data?.map((item, index) => {
                // console.log(index)
                return (
                    <tr onDoubleClick={() => handleModalForm(item)}>
                        <td>{index+1}</td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.created_at}</td>
                        <td>

                        </td>
                    </tr>
                )
            }): <></>}
        </tbody>

    )
}

export default BodyTable