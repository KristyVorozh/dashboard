import {useEffect, useState} from "react";
import {getList, ListType} from "../../api/list.ts";
import {Button, Space} from "antd";
import {setFavorite, setListArray, useFavorite, useListArray} from "../../features/list/listSlice.ts";
import {useAppDispatch} from "../../utils/hooks/useAppDispatch.ts";
import {useNavigate} from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import CardList from "../../components/CardList";

const List = () => {
    const [page, setPage] = useState(1);
    const favorite = useFavorite()
    const listArray = useListArray()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [hasMore, setHasMore] = useState(true);

    const fetchItems = async () => {
        try {
            const response = await getList(page)
            const newItems = response.data as ListType[];

            if (newItems.length === 0) {
                setHasMore(false);
                return;
            }

            dispatch(setListArray([...listArray, ...newItems]))
            setPage(page + 1);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        void fetchItems();
    },[])

    const addFavorite = (val: ListType) => {
        if (favorite[favorite.length - 1] !== val.id) {
            dispatch(setFavorite([...favorite, val.id]))
        }
    }

    return (
        <InfiniteScroll
            dataLength={listArray.length}
            next={fetchItems}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={<p>No more items to load.</p>}
        >
            <Space direction='vertical'>
                <Button onClick={() => {
                    navigate('/')
                    localStorage.setItem('count', String(listArray.length))
                    }}
                >
                    Назад
                </Button>
                {
                    listArray.map((v) => (
                        <CardList item={v} addFavorite={addFavorite} checkDashboard />
                    ))
                }
            </Space>
        </InfiniteScroll>
    );
};

export default List;
