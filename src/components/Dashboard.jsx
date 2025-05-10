import { useNavigate } from "react-router-dom";

export default function Dashboard({ user, onLogout }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout();
        navigate("/", { replace: true });
    };

    return (
        <div className='bg-gray-50 min-h-screen p-6 text-black rounded'>
            <div className='flex justify-between items-center mb-6'>
                <h1 className='text-3xl font-bold mb-4'>
                    Xush kelibsiz, {user?.username || user}!
                </h1>
                <button
                    onClick={handleLogout}
                    className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors cursor-pointer'>
                    Tizimdan chiqish
                </button>
            </div>

            <div className='grid grid-cols-2 gap-4 text-black'>
                <div className='bg-white shadow p-4 rounded-lg'>
                    <h2 className='text-lg font-semibold'>Statistika</h2>
                    <p className='text-gray-600 mt-2'>
                        Bugun siz tizimga 21 marta kirdingiz
                    </p>
                </div>

                <div className='bg-white shadow p-4 rounded-lg'>
                    <h2 className='text-lg font-semibold'>Yangiliklar</h2>
                    <ul className='list-disc list-inside text-gray-600'>
                        <li>
                            Yangilik ushbu loyiha githubga va vercelga
                            yuklanishi kutilmoqda
                        </li>
                        <li>reCAPTCHA dan o'tganingiz uchun sizga 🔥</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
