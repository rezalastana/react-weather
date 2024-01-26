import { useEffect, useState } from "react";
import "./App.css";
// import humidity rain wind
import humidity from "./assets/humidity.png";
import rain from "./assets/rain.png";
import wind from "./assets/wind.png";

function App() {
    // definisikan state
    // state input, untuk input location, default string kosong
    const [input, setInput] = useState("");
    // state term, untuk mengambil data kota dari API, default kota Yogyakarta
    const [term, setTerm] = useState("yogyakarta");
    // tampung data dari API,default unll
    const [data, setData] = useState(null);

    // handleButtonPress, ketika button di klik, maka akan menjalankan fungsi ini
    const handleButtonPress = () => {
        setTerm(input); //jadikan setTerm sesuai dengan input default, yaitu Yogyakarta
        setInput(""); //setInput menjadi kosong
        // setPlaceholder("Search..."); setPlaceholder menjadi default
    };

    // handle Enter, ketika enter di tekan, maka akan menjalankan fungsi ini
    const handleEnter = (e) => {
        // jika keycode dari enter adalah 13, maka akan menjalankan fungsi handleButtonPress
        if (e.key === "Enter") {
            handleButtonPress();
        }
    };

    // ketika masuk ke apps pertama langsung hit API kota Yogyakaarta dengan useEffect
    // dan ketika termnya(kota) berubah, maka akan hit API lagi
    // jadi ketika term berganti(didalam array), dia akan menjalankan fungsi dalam useEffect
    useEffect(() => {
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${term}&appid=fb99512def44ca451be817875c4b1b2d&units=metric`
        )
            .then((response) => response.json())
            // .then((datas) => setData(datas))
            .then((datas) => {
                setData(
                    datas.cod === 404
                        ? { code: 404, message: "not found" }
                        : datas
                );
            })
            .catch((err) => console.log("Error fetching data", err));
        //apabila dia selesai fetch dia akan memberikan response. response json disimpan dalam const data dimana dinamakan datas
    }, [term]);

    // ubah suhu menjadi integer dengan Math.round
    // const suhu = Math.round(data && data.main.temp);

    //jika data ditemukan jalankan function ini

    // penggunaan {data && data.wheather} adalah pengecekan apakah ada data yang diambil dalam API, jika tidak maka tidak melakukan apa-apa

    if (data && data.cod === 200) {
        return (
            <div className="flex justify-center items-center m-2 md:mx-0 md:h-screen  font-poppins">
                {/* jika data ada saat pencarian maka tampilkan, jika tidak tampilkan tulisan "your location not found" */}
                {/* ubah bg sesuai dengan waktu dari data json dengan menggunakan data dari icon dan di slice. ambil huruf terakhirnya*/}
                <div
                    className={`${
                        data && data.weather[0].icon.slice(-1) === "n"
                            ? "bg-night"
                            : "bg-day"
                    } w-[500px] h-[600px] rounded-xl p-8`}
                >
                    <div className="flex justify-between items-center gap-3">
                        <input
                            // setInput dengan onChange
                            // dimana ketika ada perubahan pada input, maka akan menjalankan fungsi setInput
                            onChange={(e) => setInput(e.target.value)}
                            className="py-2 px-4 rounded-full text-[14px] text-slate-400 w-full outline-none focus:shadow-lg focus:shadow-slate-500"
                            placeholder="Search..."
                            type="text"
                            name=""
                            id=""
                            value={input}
                            onKeyDown={handleEnter}
                        />
                        {/* ketika gambar di klik, maka akan merubah sesuai yang di term */}
                        <div
                            onClick={handleButtonPress}
                            className="bg-white rounded-full p-2 hover:scale-110 cursor-pointer"
                        >
                            <svg
                                className="text-slate-400 w-[20px]"
                                data-name="Layer 1"
                                fill="currentcolor"
                                id="Layer_1"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <title />
                                <path d="M16.57,16.15A9,9,0,1,0,15,17.46h0l6.25,6.25,1.42-1.42Zm-3-.14a7.07,7.07,0,1,1,1.56-1.28A6.88,6.88,0,0,1,13.59,16Z" />
                            </svg>
                        </div>
                    </div>

                    {/* icon weather*/}
                    <div className="flex justify-center mt-5">
                        {/* check jika data API ada, maka tampilkan gambar sesuai yang di assets */}
                        {data && (
                            <img
                                width={150}
                                height={150}
                                src={require(`./assets/${data.weather[0].icon}.png`)}
                                alt=""
                            />
                        )}
                    </div>
                    {/* derajat */}
                    <div className="flex justify-center mt-1 text-[65px] text-white">
                        {/* Math.round({data && data.main.temp}) &deg; C */}
                        {/* panggil suhu */}
                        {data && data.main.temp}&deg; C
                    </div>
                    {/* min and max suhu */}
                    <div className="mt-[-10] text-white flex flex-col justify-center items-center">
                        <div className="text-[40px]">{data && data.name}</div>
                        <div className="text-[20px] mb-5">
                            {data && data.weather[0].description}
                            {/* HALLO */}
                        </div>
                        <div className="flex gap-6">
                            <span>
                                Min: {data && data.main.temp_min} &deg; C
                            </span>
                            <span>
                                Max: {data && data.main.temp_max} &deg; C
                            </span>
                        </div>
                    </div>
                    {/* humudity / kecepatan angin */}
                    {/* gunakan relative agar tidak berubah */}
                    <div className="mt-10 p-4 relative rounded-full flex justify-between">
                        {/* absolute akan masuk ke parent -> relative */}
                        <div className="absolute top-0 right-0 left-0 bottom-0 bg-[#001026] opacity-30 w-full rounded-full"></div>
                        {/* agar berada diatas div parent z-10 */}
                        {/* icon1 */}
                        <div className="flex z-10 text-white gap-2 text-[20px]">
                            <img src={rain} alt="" />
                            <span>{data && data.clouds.all} %</span>
                        </div>
                        {/* icon2 */}
                        <div className="flex z-10 text-white gap-2 text-[20px]">
                            <img src={humidity} alt="" />
                            <span>{data && data.main.humidity} %</span>
                        </div>
                        {/* icon2 */}
                        <div className="flex z-10 text-white gap-2 text-[20px]">
                            <img src={wind} alt="" />
                            <span>{data && data.wind.speed} km/h</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="flex justify-center items-center m-2 md:mx-0 md:h-screen  font-poppins">
                {/* jika data ada saat pencarian maka tampilkan, jika tidak tampilkan tulisan "your location not found" */}
                {/* ubah bg sesuai dengan waktu dari data json dengan menggunakan data dari icon dan di slice. ambil huruf terakhirnya*/}
                <div className="bg-night w-[500px] h-[600px] rounded-xl p-8">
                    <div className="flex justify-between items-center gap-3">
                        <input
                            // setInput dengan onChange
                            // dimana ketika ada perubahan pada input, maka akan menjalankan fungsi setInput
                            onChange={(e) => setInput(e.target.value)}
                            className="py-2 px-4 rounded-full text-[14px] text-slate-400 w-full outline-none focus:shadow-lg focus:shadow-slate-500"
                            placeholder="Search..."
                            type="text"
                            name=""
                            id=""
                            value={input}
                            onKeyDown={handleEnter}
                        />
                        {/* ketika gambar di klik, maka akan merubah sesuai yang di term */}
                        <div
                            onClick={handleButtonPress}
                            className="bg-white rounded-full p-2 hover:scale-110 cursor-pointer"
                        >
                            <svg
                                className="text-slate-400 w-[20px]"
                                data-name="Layer 1"
                                fill="currentcolor"
                                id="Layer_1"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <title />
                                <path d="M16.57,16.15A9,9,0,1,0,15,17.46h0l6.25,6.25,1.42-1.42Zm-3-.14a7.07,7.07,0,1,1,1.56-1.28A6.88,6.88,0,0,1,13.59,16Z" />
                            </svg>
                        </div>
                    </div>
                    <div className="flex justify-center items-center text-white text-3xl mt-56 text-center">
                        Lokasi anda tidak ditemukan
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
