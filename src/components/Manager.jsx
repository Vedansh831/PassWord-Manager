import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);

  const getPasswords = async () => {
    let req = await fetch("http://localhost:3000/");
    let passwords = await req.json()
    console.log(passwords)
    setpasswordArray(passwords);
  };

  useEffect(() => {
    getPasswords();
  }, []);

  const savePassword = async () => {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      //localhost:27017/
        toast("🚀 Password saved successfully!", {
        position: window.innerWidth < 480 ? "top-center" : "top-right",
        autoClose: window.innerWidth < 480 ? 2000 : 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      // if any such id already exists means at the time of editing then delete the previous one 
      await fetch("http://localhost:3000/",{method: "DELETE",headers:{"Content-type":"application/json"},
      body: JSON.stringify({id:form.id})})


      console.log(form);
      setpasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      // localStorage.setItem(
      //   "passwords",
      //   JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
      // );
      await fetch("http://localhost:3000/",{method: "POST",headers:{"Content-type":"application/json"},
      body: JSON.stringify({...form, id: uuidv4()})
      })
      setform({ site: "", username: "", password: "" });
    } else {
      toast("Error : Password not saved");
    }
  };

  const deletePassword = async (id) => {
    
    console.log("Deleting the item with the id ", id);
    let c = confirm("Do you really want to delete this password");
    if (c) {
      setpasswordArray(passwordArray.filter((item) => item.id !== id));
      let res = await fetch("http://localhost:3000/",{method: "DELETE",headers:{"Content-type":"application/json"},
        body: JSON.stringify({...form, id})
        // localStorage.setItem(
          //   "password",
          //   JSON.stringify(passwordArray.filter((item) => item.id !== id))
    });
          toast("🚀 Password deleted successfully!", {
            position: window.innerWidth < 480 ? "top-center" : "top-right",
            autoClose: window.innerWidth < 480 ? 2000 : 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"
          });
    }
  };
  

  const editPassword = (id) => {
    toast("🚀 Password edited!", {
      position: window.innerWidth < 480 ? "top-center" : "top-right",
      autoClose: window.innerWidth < 480 ? 2000 : 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    console.log("Editing the item with the id ", id);
    setform({...passwordArray.filter((i) => i.id === id)[0],id:id});
    setpasswordArray(passwordArray.filter((item) => item.id !== id));
  };

  const showPassword = () => {
    if (ref.current.src.includes("/eyecross.svg")) {
      ref.current.src = "/eye.png";
      passwordRef.current.type = "text";
    } else {
      ref.current.src = "/eyecross.svg";
      passwordRef.current.type = "password";
    }
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const copyText = (text) => {
    toast("🚀 Copied to Clipboard!", {
      position: window.innerWidth < 480 ? "top-center" : "top-right",
      autoClose: window.innerWidth < 480 ? 2000 : 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <ToastContainer
        position={window.innerWidth < 480 ? "top-center" : "top-right"}
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div
        className="py-2 border border-white absolute inset-0 -z-10 h-full w-full bg-white 
      bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),
      linear-gradient(to_bottom,#8080800a_1px,transparent_1px)]
      bg-[size:14px_24px]"
      >
        <div
          className="py-2 border border-white absolute left-0 right-0 top-0 -z-10 
        m-auto h-[250px] w-[250px] md:h-[310px] md:w-[310px] 
        rounded-full bg-fuchsia-400 opacity-20 blur-[80px] md:blur-[100px]"
        ></div>
      </div>

      <div className="p-2 md:p-0 md:mycontainer container mx-auto max-w-3xl md:max-w-4xl">
        <h1 className="py-2 border border-white text-2xl font-bold text-center text-white">
          <span className="text-green-500">&lt;</span>
          <span className=" text-black">Pass</span>
          <span className=" text-green-500">OP/&gt;</span>
        </h1>
        <p className="text-green-500 text-lg text-center">
          Your own password manager
        </p>

        {/* Inputs */}
        <div className="text-white flex flex-col p-3 md:p-5 gap-3 items-center w-full">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter Website URL"
            type="text"
            className="rounded-xl border text-black px-3 py-2 border-green-400 w-full text-sm md:text-base"
            name="site"
            id="site"
          />

          <div className="flex flex-col md:flex-row w-full gap-2">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              type="text"
              className="rounded-xl border text-black px-3 py-2 border-green-400 w-full text-sm md:text-base"
              name="username"
              id="username"
            />

            <div className="relative w-full">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                type="password"
                className="rounded-xl border text-black px-3 py-2 border-green-400 w-full text-sm md:text-base"
                name="password"
                id="password"
              />

              <span className="absolute right-2 top-2" onClick={showPassword}>
                <img
                  ref={ref}
                  width={28}
                  className="cursor-pointer w-6 md:w-8"
                  src="/eyecross.svg"
                  alt=""
                />
              </span>
            </div>
          </div>

          <button
            onClick={savePassword}
            className="flex justify-center items-center bg-green-400 
            rounded-full px-3 py-2 w-full md:w-fit text-black text-sm md:text-base"
          >
            <img src="/addd.jpg" className="w-6 md:w-7 rounded-full" alt="" />
            Add Password
          </button>
        </div>

        {/* Password Table */}
        <div className="passwords">
          <h2 className="font-bold text-2xl text-center p-2">Your Passwords</h2>

          {passwordArray.length === 0 && (
            <div className="text-center">No passwords saved yet</div>
          )}

          {passwordArray.length !== 0 && (
            <div className="overflow-x-auto w-full">
              <table className="py-2 border border-white table-auto w-full rounded-xl overflow-hidden text-sm md:text-base">
                <thead className="bg-green-700">
                  <tr>
                    <th className="py-2 border border-white w-32">Site</th>
                    <th className="py-2 border border-white w-32">Username</th>
                    <th className="py-2 border border-white w-32">Passwords</th>
                    <th className="py-2 border border-white w-32">Actions</th>
                  </tr>
                </thead>

                <tbody className="bg-green-200">
                  {passwordArray.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td className="py-2 text-center border border-white">
                          <div className="flex items-center justify-center gap-2">
                            <a href="{item.site}" target="_blank">
                              {item.site}
                            </a>
                            <img
                              src="/copy.png"
                              className="cursor-pointer w-5 md:w-6"
                              onClick={() => {
                                copyText(item.site);
                              }}
                              alt=""
                            />
                          </div>
                        </td>

                        <td className="py-2 text-center border border-white">
                          <div className="flex items-center justify-center gap-2">
                            <span>{item.username}</span>
                            <img
                              src="/copy.png"
                              className="cursor-pointer w-5 md:w-6"
                              onClick={() => {
                                copyText(item.username);
                              }}
                              alt=""
                            />
                          </div>
                        </td>

                        <td className="py-2 text-center border border-white">
                          <div className="flex items-center justify-center gap-2">
                            <span>{"*".repeat(item.password.length)}</span>
                            <img
                              src="/copy.png"
                              className="cursor-pointer w-5 md:w-6"
                              onClick={() => {
                                copyText(item.password);
                              }}
                              alt=""
                            />
                          </div>
                        </td>

                        <td className="py-2 border border-white text-center flex items-center justify-center gap-4">
                          <img
                            src="/edit.png"
                            className="cursor-pointer w-5 md:w-6"
                            onClick={() => {
                              editPassword(item.id);
                            }}
                            alt=""
                          />
                          <img
                            src="/delete.png"
                            className="cursor-pointer w-5 md:w-6"
                            onClick={() => {
                              deletePassword(item.id);
                            }}
                            alt=""
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;



// import React, { useEffect, useRef, useState } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { v4 as uuidv4 } from "uuid";

// const API_BASE = "http://localhost:3000"; // keep one canonical URL

// const Manager = () => {
//   const ref = useRef();
//   const passwordRef = useRef();
//   const [form, setform] = useState({ site: "", username: "", password: "" });
//   const [passwordArray, setpasswordArray] = useState([]);

//   // helper to persist to localStorage
//   const persistLocal = (arr) => {
//     try {
//       localStorage.setItem("passwords", JSON.stringify(arr));
//     } catch (e) {
//       console.warn("localStorage set failed", e);
//     }
//   };

//   const getPasswords = async () => {
//     try {
//       const req = await fetch(`${API_BASE}/`);
//       if (!req.ok) throw new Error("Server responded " + req.status);
//       const passwords = await req.json();
//       if (Array.isArray(passwords) && passwords.length > 0) {
//         setpasswordArray(passwords);
//         persistLocal(passwords);
//         return;
//       }
//       // if server returned empty array, try localStorage as fallback
//     } catch (err) {
//       console.warn("Server fetch failed, falling back to localStorage:", err);
//     }

//     // fallback to localStorage
//     try {
//       const stored = localStorage.getItem("passwords");
//       if (stored) {
//         setpasswordArray(JSON.parse(stored));
//       } else {
//         setpasswordArray([]);
//       }
//     } catch (e) {
//       console.warn("Failed reading localStorage", e);
//       setpasswordArray([]);
//     }
//   };

//   useEffect(() => {
//     getPasswords();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const savePassword = async () => {
//     if (
//       form.site.length > 3 &&
//       form.username.length > 3 &&
//       form.password.length > 3
//     ) {
//       const id = uuidv4();
//       const newEntry = { ...form, id };

//       // Optimistic UI update
//       const newArr = [...passwordArray, newEntry];
//       setpasswordArray(newArr);
//       persistLocal(newArr);

//       toast("🚀 Password saved successfully!", {
//         position: window.innerWidth < 480 ? "top-center" : "top-right",
//         autoClose: window.innerWidth < 480 ? 2000 : 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//       });

//       try {
//         const res = await fetch(`${API_BASE}/`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(newEntry),
//         });

//         if (!res.ok) {
//           // server failed — revert optimistic update (optional)
//           console.warn("Server save failed:", res.status);
//           // (you could show an error toast here)
//         }
//       } catch (err) {
//         console.error("POST request failed:", err);
//         // server unreachable — we already saved to localStorage, so it's still persisted in client
//       }

//       setform({ site: "", username: "", password: "" });
//     } else {
//       toast("Error : Password not saved");
//     }
//   };

//   const deletePassword = async (id) => {
//     console.log("Deleting the item with the id ", id);
//     const c = confirm("Do you really want to delete this password");
//     if (!c) return;

//     // Optimistically update UI
//     setpasswordArray((prev) => {
//       const updated = prev.filter((item) => item.id !== id);
//       persistLocal(updated);
//       return updated;
//     });

//     try {
//       const res = await fetch(`${API_BASE}/`, {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ id }),
//       });

//       if (!res.ok) {
//         console.warn("Server DELETE failed:", res.status);
//         // optionally reload from server or notify user
//       }
//     } catch (err) {
//       console.error("DELETE request failed:", err);
//       // optionally revert UI change if you want to enforce server success
//     }

//     toast("🚀 Password deleted successfully!", {
//       position: window.innerWidth < 480 ? "top-center" : "top-right",
//       autoClose: window.innerWidth < 480 ? 2000 : 5000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: "light",
//     });
//   };

//   const editPassword = (id) => {
//     toast("🚀 Password edited!", {
//       position: window.innerWidth < 480 ? "top-center" : "top-right",
//       autoClose: window.innerWidth < 480 ? 2000 : 5000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: "light",
//     });

//     const item = passwordArray.find((i) => i.id === id);
//     if (item) {
//       setform(item);
//       setpasswordArray(passwordArray.filter((it) => it.id !== id));
//       persistLocal(passwordArray.filter((it) => it.id !== id));
//     }
//   };

//   const showPassword = () => {
//     if (ref.current.src.includes("/eyecross.svg")) {
//       ref.current.src = "/eye.png";
//       passwordRef.current.type = "text";
//     } else {
//       ref.current.src = "/eyecross.svg";
//       passwordRef.current.type = "password";
//     }
//   };

//   const handleChange = (e) => {
//     setform({ ...form, [e.target.name]: e.target.value });
//   };

//   const copyText = (text) => {
//     toast("🚀 Copied to Clipboard!", {
//       position: window.innerWidth < 480 ? "top-center" : "top-right",
//       autoClose: window.innerWidth < 480 ? 2000 : 5000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: "light",
//     });

//     navigator.clipboard.writeText(text);
//   };

//   return (
//     <>
//       <ToastContainer
//         position={window.innerWidth < 480 ? "top-center" : "top-right"}
//         autoClose={2000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="light"
//       />

//       <div
//         className="py-2 border border-white absolute inset-0 -z-10 h-full w-full bg-white 
//       bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),
//       linear-gradient(to_bottom,#8080800a_1px,transparent_1px)]
//       bg-[size:14px_24px]"
//       >
//         <div
//           className="py-2 border border-white absolute left-0 right-0 top-0 -z-10 
//         m-auto h-[250px] w-[250px] md:h-[310px] md:w-[310px] 
//         rounded-full bg-fuchsia-400 opacity-20 blur-[80px] md:blur-[100px]"
//         ></div>
//       </div>

//       <div className="p-2 md:p-0 md:mycontainer container mx-auto max-w-3xl md:max-w-4xl">
//         <h1 className="py-2 border border-white text-2xl font-bold text-center text-white">
//           <span className="text-green-500">&lt;</span>
//           <span className=" text-black">Pass</span>
//           <span className=" text-green-500">OP/&gt;</span>
//         </h1>
//         <p className="text-green-500 text-lg text-center">
//           Your own password manager
//         </p>

//         {/* Inputs */}
//         <div className="text-white flex flex-col p-3 md:p-5 gap-3 items-center w-full">
//           <input
//             value={form.site}
//             onChange={handleChange}
//             placeholder="Enter Website URL"
//             type="text"
//             className="rounded-xl border text-black px-3 py-2 border-green-400 w-full text-sm md:text-base"
//             name="site"
//             id="site"
//           />

//           <div className="flex flex-col md:flex-row w-full gap-2">
//             <input
//               value={form.username}
//               onChange={handleChange}
//               placeholder="Enter Username"
//               type="text"
//               className="rounded-xl border text-black px-3 py-2 border-green-400 w-full text-sm md:text-base"
//               name="username"
//               id="username"
//             />

//             <div className="relative w-full">
//               <input
//                 ref={passwordRef}
//                 value={form.password}
//                 onChange={handleChange}
//                 placeholder="Enter Password"
//                 type="password"
//                 className="rounded-xl border text-black px-3 py-2 border-green-400 w-full text-sm md:text-base"
//                 name="password"
//                 id="password"
//               />

//               <span className="absolute right-2 top-2" onClick={showPassword}>
//                 <img
//                   ref={ref}
//                   width={28}
//                   className="cursor-pointer w-6 md:w-8"
//                   src="/eyecross.svg"
//                   alt=""
//                 />
//               </span>
//             </div>
//           </div>

//           <button
//             onClick={savePassword}
//             className="flex justify-center items-center bg-green-400 
//             rounded-full px-3 py-2 w-full md:w-fit text-black text-sm md:text-base"
//           >
//             <img src="/addd.jpg" className="w-6 md:w-7 rounded-full" alt="" />
//             Add Password
//           </button>
//         </div>

//         {/* Password Table */}
//         <div className="passwords">
//           <h2 className="font-bold text-2xl text-center p-2">Your Passwords</h2>

//           {passwordArray.length === 0 && (
//             <div className="text-center">No passwords saved yet</div>
//           )}

//           {passwordArray.length !== 0 && (
//             <div className="overflow-x-auto w-full">
//               <table className="py-2 border border-white table-auto w-full rounded-xl overflow-hidden text-sm md:text-base">
//                 <thead className="bg-green-700">
//                   <tr>
//                     <th className="py-2 border border-white w-32">Site</th>
//                     <th className="py-2 border border-white w-32">Username</th>
//                     <th className="py-2 border border-white w-32">Passwords</th>
//                     <th className="py-2 border border-white w-32">Actions</th>
//                   </tr>
//                 </thead>

//                 <tbody className="bg-green-200">
//                   {passwordArray.map((item) => {
//                     return (
//                       <tr key={item.id}>
//                         <td className="py-2 text-center border border-white">
//                           <div className="flex items-center justify-center gap-2">
//                             <a href={item.site} target="_blank" rel="noreferrer">
//                               {item.site}
//                             </a>
//                             <img
//                               src="/copy.png"
//                               className="cursor-pointer w-5 md:w-6"
//                               onClick={() => {
//                                 copyText(item.site);
//                               }}
//                               alt=""
//                             />
//                           </div>
//                         </td>

//                         <td className="py-2 text-center border border-white">
//                           <div className="flex items-center justify-center gap-2">
//                             <span>{item.username}</span>
//                             <img
//                               src="/copy.png"
//                               className="cursor-pointer w-5 md:w-6"
//                               onClick={() => {
//                                 copyText(item.username);
//                               }}
//                               alt=""
//                             />
//                           </div>
//                         </td>

//                         <td className="py-2 text-center border border-white">
//                           <div className="flex items-center justify-center gap-2">
//                             <span>{item.password}</span>
//                             <img
//                               src="/copy.png"
//                               className="cursor-pointer w-5 md:w-6"
//                               onClick={() => {
//                                 copyText(item.password);
//                               }}
//                               alt=""
//                             />
//                           </div>
//                         </td>

//                         <td className="py-2 border border-white text-center flex items-center justify-center gap-4">
//                           <img
//                             src="/edit.png"
//                             className="cursor-pointer w-5 md:w-6"
//                             onClick={() => {
//                               editPassword(item.id);
//                             }}
//                             alt=""
//                           />
//                           <img
//                             src="/delete.png"
//                             className="cursor-pointer w-5 md:w-6"
//                             onClick={() => {
//                               deletePassword(item.id);
//                             }}
//                             alt=""
//                           />
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Manager;
