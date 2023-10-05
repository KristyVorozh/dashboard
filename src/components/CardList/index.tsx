import {Button, Card, Image, Space, Typography} from "antd";
import {ListType} from "../../api/list.ts";
import {useFavorite} from "../../features/list/listSlice.ts";

interface CardListProps {
    item: ListType, checkDashboard?: boolean, addFavorite?: (item: ListType) => void
}
const CardList = ({item, checkDashboard, addFavorite}: CardListProps) => {
    const favorite = useFavorite()

    return (
        <Card key={item.id}>
            <Space direction='vertical'>
                <Typography>{item.id}</Typography>
                <Typography>{item.title}</Typography>
                <Image src={item.thumbnailUrl} />
                {checkDashboard && (
                    <Button
                        onClick={() => addFavorite && addFavorite(item)}
                        type={"primary"}
                        disabled={!!favorite.filter((val) => val === item.id).length}
                    >
                        Добавить в избранное
                    </Button>
                )}
            </Space>
        </Card>
    );
};

export default CardList;
