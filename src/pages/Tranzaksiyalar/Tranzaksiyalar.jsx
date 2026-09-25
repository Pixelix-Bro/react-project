import {
  ArrowDownRight,
  ArrowUpRight,
  EllipsisVertical,
  Plus,
  SquarePen,
  Trash2,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import apiClient from "../../hooks/useAxios";
function Otkazma() {
  const [data, setData] = useState([]);
  const [types, setTypes] = useState("barcha");
  const [nam, setNam] = useState("");

  async function getApi() {
    try {
      const { data } = await apiClient.get("/harajat");

      let result = [];

      switch (types) {
        case "barcha":
          result = [...data].sort(
            (a, b) => new Date(b.date) - new Date(a.date),
          );
          break;

        case "daromat":
          result = data.filter((item) => item.type === "income");
          break;

        case "xarajat":
          result = data.filter((item) => item.type === "expense");
          break;

        default:
          result = data;
      }

      setData(result);
    } catch (error) {
      console.log(error.message);
    }
  }

  const [search, setSearch] = useState("");

  const dates = data.filter((item) =>
    item.title.toLowerCase().includes(search.toLocaleLowerCase()),
  );

  useEffect(() => {
    getApi();
  }, [types]);

  // input value

  const [title, setTitle] = useState("");
  const [summa, setSumma] = useState("");
  const [kateori, setKategori] = useState([]);
  const [date, setDate] = useState("");
  const [type, setType] = useState("");

  const [cotegoriy, setCotegoriy] = useState("");
  const [modal, setModal] = useState("");

  async function del(id) {
    try {
      await apiClient.delete(`/harajat/${id}`);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function hendSub(e) {
    e.preventDefault();
    const tr = {
      id: Date.now(),
      title: title,
      category: cotegoriy,
      type: type,
      amount: summa,
      date: date,
    };

    setModal("");
    try {
      await apiClient.post("/harajat", tr);
    } catch (error) {
      console.log(error.message);
    }
    console.log(tr);
  }

  const [id, setid] = useState(null);

  const [edit, setEdit] = useState(null);
  async function getEdit() {
    try {
    } catch (error) {
      console.log(error.message);
    }
  }

  async function submitPut(e) {
    e.preventDefault();

    const tr = {
      title: title,
      category: cotegoriy,
      type: type,
      amount: summa,
      date: date,
    };

    try {
      await apiClient.put(`/harajat/${id}`, tr);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    if (edit) {
      setCotegoriy(edit.category);
      setTitle(edit.title);
      setType(edit.type);
      setDate(edit.date);
      setSumma(edit.amount);
    }
  }, [edit]);

  async function getCategoriy() {
    try {
      const { data } = await apiClient.get("/category");
      console.log(data);
      setKategori(data);
    } catch (error) {}
  }

  console.log(kateori);

  useEffect(() => {
    getCategoriy();
  }, []);

  return (
    <div className="w-full flex flex-col p-[20px] gap-[30px]">
      <div className="flex-col gap-[20px] flex lg:flex-row  justify-between w-full">
        <div className="left">
          <p className="text-[27px] font-bold">Tranzaksiyalar</p>
          <p className="text-gray-500">Barcha xarajat va daromadlar</p>
        </div>
        <div className="right">
          <button
            onClick={() => setModal("add")}
            className="flex gap-[10px] p-[10px] bg-black rounded-xl text-white hover:bg-black/70 transition duration-300"
          >
            <Plus /> Yangi tranzaksiya
          </button>
        </div>
      </div>
      <div className="flex flex-col border border-gray-400  h-[700px] rounded-2xl p-[10px] overflow-auto scroll-auto">
        <div className="flex w-full gap-[10px] flex-col gap-[20px] flex lg:flex-row">
          <input
            type="text"
            placeholder="Search"
            className="p-[10px]  w-full rounded-2xl border border-gray-900 outline-none "
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="flex gap-[8px]">
            <button
              onClick={() => setTypes("barcha")}
              className={`${types == "barcha" ? "p-[6px] border border-gray-500 rounded-2xl bg-black text-white" : "p-[6px] border border-gray-500 rounded-2xl transition duration-300"} `}
            >
              Barcha
            </button>
            <button
              onClick={() => setTypes("daromat")}
              className={`${types == "daromat" ? "p-[6px] border border-gray-500 rounded-2xl bg-black text-white" : "p-[6px] border border-gray-500 rounded-2xl transition duration-300"} `}
            >
              Daromad
            </button>
            <button
              onClick={() => setTypes("xarajat")}
              className={`${types == "xarajat" ? "p-[6px] border border-gray-500 rounded-2xl bg-black text-white" : "p-[6px] border border-gray-500 rounded-2xl transition duration-300"} `}
            >
              Xarajat
            </button>
          </div>
        </div>
        {dates.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center py-3 p-[20px] gap-[20px] mt-[20px]"
          >
            <div className="flex gap-[10px]">
              <div className="">
                {item.type == "expense" ? (
                  <ArrowUpRight
                    className=" p-[10px] bg-red-200 rounded-[50%] text-red-500 "
                    size={50}
                  />
                ) : (
                  <ArrowDownRight
                    className=" p-[10px] bg-green-200 rounded-[50%] text-green-500 "
                    size={50}
                  />
                )}
              </div>

              <div>
                <h2 className="text-xl font-semibold">{item.title}</h2>
                <p className="text-gray-500">{item.category}</p>
              </div>
            </div>

            <div className="text-right flex gap-[20px] items-center ">
              <div className="truncate">
                <h2
                  className={`font-bold text-xl ${
                    item.type === "income" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {item.type === "income" ? "+" : "-"}
                  {item.amount.toLocaleString()} so'm
                </h2>

                <p className="text-gray-500">{item.date}</p>
              </div>
              <div className="flex gap-[10px] relative">
                <SquarePen
                  className="cursor-pointer sm:block hidden"
                  onClick={() => {
                    setEdit(item);
                    setModal("edit");
                    setid(item.id);
                  }}
                />
                <Trash2
                  onClick={() => {
                    setModal("delete");
                    setid(item.id);
                  }}
                  className="text-red-400 sm:block hidden hover:text-red-500 transition duration-200 cursor-pointer"
                />
                {modal == "all" ? (
                  <div className="flex flex-col gap-[20px] absolute right-[10px] rounded-xl p-[10px] bottom-[20px] bg-black">
                    <div
                      className="flex text-gray-500"
                      onClick={() => {
                        setEdit(item);
                        setModal("edit");
                        setid(item.id);
                      }}
                    >
                      <SquarePen className="cursor-pointer " />
                      Edit
                    </div>

                    <div
                      className="flex text-red-500"
                      onClick={() => {
                        setModal("delete");
                        setid(item.id);
                      }}
                    >
                      <Trash2 className="text-red-400 hover:text-red-500 transition duration-200 cursor-pointer" />
                      Delete
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <EllipsisVertical
                  onClick={() => {
                    if (modal == "all") {
                      setModal("");
                    } else {
                      setModal("all");
                    }
                  }}
                  className="sm:hidden block"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {modal == "add" ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
          onClick={() => setModal("")}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-gray-200 pb-5">
              <h2 className="text-2xl font-bold">Yangi tranzaksiya</h2>

              <button
                type="button"
                onClick={() => setModal("")}
                className="rounded-xl p-2 transition hover:bg-gray-100 active:scale-95"
              >
                <X size={22} onClick={() => setModal("")} />
              </button>
            </div>

            <form onSubmit={hendSub} className="mt-6 flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="font-medium">Nomi</label>

                <input
                  autoFocus
                  required
                  type="text"
                  placeholder="Masalan: Supermarket"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-medium">Summa (so'm)</label>
                <input
                  required
                  min="0"
                  type="text"
                  placeholder="0"
                  value={summa ? Number(summa).toLocaleString("uz-UZ") : ""}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    setSumma(value);
                  }}
                  className="rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-medium">Kategoriya</label>

                <select
                  min="0"
                  onChange={(e) => {
                    setCotegoriy(e.target.value);
                  }}
                  value={cotegoriy}
                  className="rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
                >
                  <option>Tanlang</option>
                  {kateori.map((item) => {
                    return <option key={item.id}>{item.category}</option>;
                  })}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-medium">Sana</label>

                <input
                  required
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => {
                    (setType("expense"), setNam("expense"));
                  }}
                  className={`flex items-center justify-center gap-3 rounded-2xl border p-3 text-lg font-medium transition active:scale-95 ${
                    nam === "expense"
                      ? "border-black bg-black text-white"
                      : "border-gray-300 bg-white hover:bg-gray-100"
                  }`}
                >
                  <ArrowUpRight
                    size={36}
                    className="rounded-full bg-red-100 p-2 text-red-500"
                  />
                  Chiqim
                </button>

                <button
                  type="button"
                  onClick={() => {
                    (setType("income"), setNam("income"));
                  }}
                  className={`flex items-center justify-center gap-3 rounded-2xl border p-3 text-lg font-medium transition active:scale-95 ${
                    nam === "income"
                      ? "border-black bg-black text-white"
                      : "border-gray-300 bg-white hover:bg-gray-100"
                  }`}
                >
                  <ArrowDownRight
                    size={36}
                    className="rounded-full bg-green-100 p-2 text-green-500"
                  />
                  Kirim
                </button>
              </div>

              <div className="mt-2 flex gap-4">
                <button
                  type="button"
                  onClick={() => setModal("")}
                  className="grow rounded-xl border border-gray-300 py-3 text-lg transition hover:bg-gray-100 active:scale-95"
                >
                  Bekor qilish
                </button>

                <button
                  type="submit"
                  className="grow rounded-xl bg-black py-3 text-lg text-white transition hover:bg-neutral-800 active:scale-95"
                >
                  Qo'shish
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        ""
      )}

      {modal == "delete" ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-white p-[10px] w-[340px] rounded-xl text-center flex flex-col items-center gap-[10px]">
            <X
              className="p-[10px] bg-red-300 rounded-[50%] text-white"
              size={45}
            />
            <p>Siz rostan ham Ushbu Tranzaksiyani o'chirmoqchimisiz !?</p>
            <div className=" flex gap-[30px] p-[10px]">
              <button
                onClick={() => setModal("")}
                className="bg-green-400 text-white pl-[30px] pr-[30px] p-[10px] rounded-xl hover:bg-green-600"
              >
                Yo'q
              </button>{" "}
              <button
                onClick={() => del(id)}
                className="bg-red-400 text-white pl-[30px] pr-[30px] p-[10px] rounded-xl hover:bg-red-600"
              >
                Ha
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      {modal == "edit" ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-gray-200 pb-5">
              <h2 className="text-2xl font-bold">Yangi tranzaksiya</h2>

              <button
                type="button"
                onClick={() => setModal("")}
                className="rounded-xl p-2 transition hover:bg-gray-100 active:scale-95"
              >
                <X size={22} onClick={() => setModal("")} />
              </button>
            </div>

            <form onSubmit={submitPut} className="mt-6 flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="font-medium">Nomi</label>

                <input
                  autoFocus
                  required
                  type="text"
                  placeholder="Masalan: Supermarket"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-medium">Summa (so'm)</label>

                <input
                  required
                  min="0"
                  type="text"
                  placeholder="0"
                  value={summa ? Number(summa).toLocaleString("uz-UZ") : ""}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    setSumma(value);
                  }}
                  className="rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-medium">Kategoriya</label>

                <select
                  min="0"
                  onChange={(e) => {
                    setCotegoriy(e.target.value);
                  }}
                  value={cotegoriy}
                  className="rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
                >
                  <option>Tanlang</option>
                  {kateori.map((item) => {
                    return <option key={item.id}>{item.category}</option>;
                  })}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-medium">Sana</label>

                <input
                  required
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setType("expense");
                  }}
                  className={`flex items-center justify-center gap-3 rounded-2xl border p-3 text-lg font-medium transition active:scale-95 ${
                    type === "expense"
                      ? "border-black bg-black text-white"
                      : "border-gray-300 bg-white hover:bg-gray-100"
                  }`}
                >
                  <ArrowUpRight
                    size={36}
                    className="rounded-full bg-red-100 p-2 text-red-500"
                  />
                  Chiqim
                </button>

                <button
                  type="button"
                  onClick={() => {
                    (setType("income"), setNam("income"));
                  }}
                  className={`flex items-center justify-center gap-3 rounded-2xl border p-3 text-lg font-medium transition active:scale-95 ${
                    type === "income"
                      ? "border-black bg-black text-white"
                      : "border-gray-300 bg-white hover:bg-gray-100"
                  }`}
                >
                  <ArrowDownRight
                    size={36}
                    className="rounded-full bg-green-100 p-2 text-green-500"
                  />
                  Kirim
                </button>
              </div>

              <div className="mt-2 flex gap-4">
                <button
                  type="button"
                  onClick={() => setModal("")}
                  className="grow rounded-xl border border-gray-300 py-3 text-lg transition hover:bg-gray-100 active:scale-95"
                >
                  Bekor qilish
                </button>

                <button
                  type="submit"
                  className="grow rounded-xl bg-black py-3 text-lg text-white transition hover:bg-neutral-800 active:scale-95"
                >
                  Qo'shish
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Otkazma;
