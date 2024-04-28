(() => {
  let bookArray = [];

  function t(t) {
    t.preventDefault();
    const judul = document.querySelector("#masukanJudul"),
      penulis = document.querySelector("#masukanPenulis"),
      tahun = document.querySelector("#masukanTahun"),
      selesai = document.querySelector("#masukanBukuSelesai"),
      c = {
        id: +new Date(),
        title: judul.value,
        author: penulis.value,
        year: Number(tahun.value),
        isComplete: selesai.checked,
      };

    console.log(c), bookArray.push(c), document.dispatchEvent(new Event("bookChanged"));
  }

  function n(t) {
    t.preventDefault();
    const cari = document.querySelector("#cariJudulBuku");

    (query = cari.value),
      query
        ? c(
            bookArray.filter(function (book) {
              return book.title.toLowerCase().includes(query.toLowerCase());
            })
          )
        : c(bookArray);
  }

  function o(t) {
    const idBuku = Number(t.target.id),
      indexBuku = bookArray.findIndex(function (book) {
        return book.id === idBuku;
      });
    -1 !== indexBuku &&
      ((bookArray[indexBuku] = {
        ...bookArray[indexBuku],
        isComplete: !0,
      }),
      document.dispatchEvent(new Event("bookChanged")));
  }

  function d(t) {
    const idBuku = Number(t.target.id),
      indexBuku = bookArray.findIndex(function (book) {
        return book.id === idBuku;
      });
    -1 !== indexBuku &&
      ((bookArray[indexBuku] = {
        ...bookArray[indexBuku],
        isComplete: !1,
      }),
      document.dispatchEvent(new Event("bookChanged")));
  }

  function i(t) {
    t.preventDefault();
    const bookId = Number(t.target.id);
    const bookIndex = bookArray.findIndex((book) => book.id === bookId);

    if (bookIndex !== -1) {
      swal({
        title: "Hapus Buku",
        text: "Apakah Anda yakin ingin menghapus buku ini?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          bookArray.splice(bookIndex, 1);
          document.dispatchEvent(new Event("bookChanged"));
          swal("Buku berhasil dihapus", {
            icon: "success",
          });
        }
      });
    }
  }

  function c(e) {
    const t = document.querySelector("#belumSelesai"),
      n = document.querySelector("#selesaiBaca");
    (t.innerHTML = ""), (n.innerHTML = "");

    for (const c of e) {
      const e = document.createElement("article");
      e.classList.add("card");

      const a = document.createElement("h3");
      a.classList.add("header-h3");
      a.innerText = c.title;

      const u = document.createElement("p");
      u.classList.add("leading-relaxed");
      u.innerText = "Penulis: " + c.author;

      const r = document.createElement("p");
      r.classList.add("leading-relaxed");

      if (((r.innerText = "Tahun: " + c.year), e.appendChild(a), e.appendChild(u), e.appendChild(r), c.isComplete)) {
        const t = document.createElement("div");
        t.classList.add("mt-3");

        const o = document.createElement("button");
        (o.id = c.id), (o.innerText = "Belum Selesai dibaca"), o.classList.add("btn-warning"), o.addEventListener("click", d);

        const a = document.createElement("button");
        (a.id = c.id), (a.innerText = "Hapus buku"), a.classList.add("btn-delete"), a.addEventListener("click", i), t.appendChild(o), t.appendChild(a), e.appendChild(t), n.appendChild(e);
      } else {
        const n = document.createElement("div");
        n.classList.add("mt-3");

        const d = document.createElement("button");
        (d.id = c.id), (d.innerText = "Selesai dibaca"), d.classList.add("btn-done"), d.addEventListener("click", o);

        const a = document.createElement("button");
        (a.id = c.id), (a.innerText = "Hapus buku"), a.classList.add("btn-delete"), a.addEventListener("click", i), n.appendChild(d), n.appendChild(a), e.appendChild(n), t.appendChild(e);
      }
    }
  }

  function a() {
    !(function (book) {
      localStorage.setItem("books", JSON.stringify(book));
    })(bookArray),
      c(bookArray);
  }

  window.addEventListener("load", function () {
    (bookArray = JSON.parse(localStorage.getItem("books")) || []), c(bookArray);

    const o = document.querySelector("#masukanBuku"),
      d = document.querySelector("#cariBuku");

    o.addEventListener("submit", t), d.addEventListener("submit", n), document.addEventListener("bookChanged", a);
  });
})();
