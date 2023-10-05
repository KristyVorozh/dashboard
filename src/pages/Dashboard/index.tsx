import {Button, Space, Typography} from "antd";
import {useFavorite, useListArray} from "../../features/list/listSlice.ts";
import {useNavigate} from "react-router-dom";
import CardList from "../../components/CardList";
import {useEffect, useState} from "react";
import {ListType} from "../../api/list.ts";

const Dashboard = () => {
    const favorite = useFavorite()
    const listArray = useListArray()
    const navigate = useNavigate()
    const [listCardArray, setListCardArray] = useState<ListType[]>([]);

    useEffect(() => {
        const arr = listArray.filter(item => favorite.some(favItem => favItem === item.id))
        setListCardArray(arr.reduce((o: ListType[], i) => {
            if (!o.find((v: ListType) => v.id == i.id)) {
                o.push(i);
            }
            return o;
        }, []))
    }, [listArray]);

    return (
        <Space  direction="vertical">
            <Typography>Избранное:</Typography>
            {
                listCardArray.map((v) => (
                    <CardList item={v} />
                ))
            }
            <Button type="primary" onClick={() => navigate('/list')}>Перейти на страницу</Button>
        </Space>
    );
};

export default Dashboard;
