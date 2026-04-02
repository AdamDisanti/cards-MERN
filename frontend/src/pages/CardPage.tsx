import PageTitle from '../components/PageTitle.tsx';
import LoggedInName from '../components/LoggedInName.tsx';
import CardUI from '../components/CardUI.tsx';
const CardPage = () => {
    return (
        <div>
            <PageTitle />
            <LoggedInName />
            <CardUI />
        </div>
    );
}
export default CardPage;