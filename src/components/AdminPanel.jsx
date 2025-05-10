import { useNavigate } from "react-router-dom";
import { users } from "../data/users";

const AdminPanel = ({ user, onLogout }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout();
        navigate("/");
    };

    return (
        <div className='min-h-screen bg-white p-6 text-black'>
            <div className='flex justify-between items-center mb-6'>
                <h1 className='text-3xl font-semibold text-gray-800'>
                    Admin Panelga xush kelibsiz, {user?.username}!
                </h1>
                <button
                    onClick={handleLogout}
                    className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors cursor-pointer'>
                    Tizimdan chiqish
                </button>
            </div>

            <div className='grid grid-cols-2 gap-4'>
                <div className='bg-blue-50 border border-blue-200 p-4 rounded-lg'>
                    <h2 className='font-semibold text-lg'>
                        Foydalanuvchilar soni:
                    </h2>
                    <p className='mt-2 text-blue-600 text-xl'>{users.length}</p>
                </div>
                <div className='bg-green-50 border border-gray-200 p-4 rounded-lg'>
                    <h2 className='font-semibold text-lg'>
                        Saytga kirib chiqishlar soni:
                    </h2>
                    <p className='mt-2 text-green-600 text-xl'>124</p>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
