<template>
  <div class="q-pa-lg">
    <div class="col-10">
      <q-img
        src="https://cdn.quasar.dev/img/parallax2.jpg"
        style="height: 150px; max-width: 81200px"
        img-class="my-custom-image"
        class="rounded-borders"
      >
        <div class="absolute-full text-subtitle2 flex flex-center">
          Aktivasi Tahunan
        </div>
      </q-img>
    </div>
  </div>

  <div class="q-pa-md q-gutter-sm">
    <q-btn
      square
      color="green"
      icon="add"
      label="tambah data"
      @click="showNewDialog"
    />
  </div>
  <br />
  <div class="q-px-md">
    <div
      class="no-margin"
      :style="rows.length == 0 ? 'display: block' : 'display: none'"
    >
      <q-markup-table>
        <thead>
          <tr>
            <th class="no-border" colspan="6">
              <div class="row q-my-mb float-right">
                <q-input outlined dense v-model="searchString" label="Search..">
                  <template v-slot:append>
                    <q-icon
                      v-if="searchString !== ''"
                      name="close"
                      @click="searchString = ''"
                      class="cursor-pointer"
                    />
                    <q-icon name="search" />
                  </template>
                </q-input>
                <q-space />
              </div>
            </th>
          </tr>
          <tr>
            <th class="text-left" style="width: 0.5cm">Id Instruktur</th>
            <th class="text-left" style="width: 2.5cm">Nama</th>
            <th class="text-left" style="width: 3.5cm">Tanggal Lahir</th>
            <th class="text-left" style="width: 6.5cm">alamat</th>
            <th class="text-left" style="width: 4.5cm">No Telepon</th>
            <th class="text-left" style="width: 6cm">username</th>

            <th class="text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="n in 6" :key="n">
            <td class="text-left">
              <q-skeleton animation="blink" type="text" width="20px" />
            </td>
            <td class="text-right">
              <q-skeleton animation="blink" type="text" width="50px" />
            </td>
            <td class="text-right">
              <q-skeleton animation="blink" type="text" width="35px" />
            </td>
            <td class="text-right">
              <q-skeleton animation="blink" type="text" width="65px" />
            </td>
            <td class="text-right">
              <q-skeleton animation="blink" type="text" width="25px" />
            </td>
            <td class="text-right">
              <q-skeleton animation="blink" type="text" width="85px" />
            </td>
            <td class="text-left">
              <q-icon class="q-mr-md" name="edit" color="positive" size="sm" />
              <q-icon name="delete" color="negative" size="sm" />
            </td>
          </tr>
          <tr>
            <td class="text-right">
              <q-icon
                class="q-mr-md"
                name="navigate_before"
                color="grey"
                size="sm"
              />
              <q-icon
                class="q-mr-xs"
                name="navigate_next"
                color="grey"
                size="sm"
              />
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
    <q-table
      :filter="searchString"
      :rows="rows"
      :columns="columns"
      row-key="id"
      :rows-per-page-options="[6]"
      :style="rows.length == 0 ? 'display: none' : 'display: block'"
    >
      <template v-slot:top>
        <q-input outlined dense v-model="searchString" label="Search...">
          <template v-slot:append>
            <q-icon
              v-if="searchString !== ''"
              name="close"
              @click="searchString = ''"
              class="cursor-pointer"
            />
            <q-icon name="search" />
          </template>
        </q-input>
        <q-space />
      </template>
      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <q-btn
            flat
            round
            color="primary"
            icon="print"
            @click="
              $q.dialog({
                title: 'Confirm',
                message: 'Apakah anda yakin cetak struk?',
                cancel: true,
                persistent: true,
              })
                .onOk(() => {
                  printDataDialog(props.row);
                })
                .onOk(() => {
                  // console.log('>>>> second OK catcher')
                })
                .onCancel(() => {
                  // console.log('>>>> Cancel')
                })
                .onDismiss(() => {
                  // console.log('I am triggered on both OK and Cancel')
                })
            "
          />
          <q-btn
            flat
            round
            color="negative"
            icon="delete"
            @click="deleteDataDialog(props.row)"
          />
        </q-td>
      </template>
    </q-table>
  </div>

  <q-dialog v-model="newDialog" persistent>
    <q-card style="min-width: 14cm">
      <q-card-section class="q-pb-none">
        <div class="text-h6 text-center">Tambah Aktivasi Member</div>
      </q-card-section>
      <q-card-section>
        <q-form
          @submit.prevent="saveNewData"
          @reset="closeNewDialog"
          class="q-gutter-md"
        >
          <q-input
            dense
            outlined
            v-model="newData.namaPegawai.value"
            label="Name"
            disable
          />
          <q-select
            dense
            outlined
            v-model="newData.idMember.value"
            option-label="NAMA_MEMBER"
            :options="idMember"
            label="Nama Member"
          />

   

          <div class="row float-right q-mp-t">
            <q-btn
              class="q-mb-md q-ml-sm q-mr-md"
              label="Cancel"
              type="reset"
              color="primary"
              flat
            />
            <q-btn class="q-mb-md" label="Save" type="submit" color="primary" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<style scoped>
.small-card {
  width: 15%;
}

.q-ml-md {
  margin-left: 25px;
}

.absolute-full.text-subtitle2 {
  font-size: 1.5rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 400;
}
</style>

<script>
import { defineComponent, onMounted, ref } from 'vue';
import { api } from 'boot/axios';
import { useQuasar } from 'quasar';
export default defineComponent({
  name: 'InstrukturComponent',
  setup() {
    const $q = useQuasar();
    const columns = [
      {
        name: 'id',
        required: false,
        label: 'ID',
        align: 'left',
        field: (row) => row.ID_TRANSAKSI_AKTIVASI,
        format: (val) => `${val}`,
        sortable: true,
      },

      {
        name: 'namaPegawai',
        required: false,
        label: 'Pegawai',
        align: 'left',
        field: (row) => row.NAMA_PEGAWAI,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: 'namaMember',
        required: false,
        label: 'Member',
        align: 'left',
        field: (row) => row.NAMA_MEMBER,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: 'birth',
        required: false,
        label: 'Tanggal Transaksi Aktivasi',
        align: 'left',
        field: (row) => row.TGL_TRANSAKSI_AKTIVASI,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: 'transaksiAktivasi',
        required: false,
        label: 'Masa Berlaku Transaksi Aktivasi',
        align: 'left',
        field: (row) => row.MASA_BERLAKU_TRANSAKSI_AKTIVASI,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: 'pembayaran',
        required: false,
        label: 'jumlah pembayaran',
        align: 'left',
        field: (row) => row.JUMLAH_PEMBAYARAN_TRANSAKSI_AKTIVASI,
        format: (val) => `${val}`,
        sortable: true,
      },

      {
        name: 'action',
        required: false,
        label: 'Action',
        align: 'left',
      },
    ];
    const rows = ref([]);
    const newDialog = ref(false);
    const idPegawai = ref([]);
    const idMember = ref([]);
    const user = JSON.parse(localStorage.getItem('user') || '').pegawai;

    const newData = {
      idPegawai: ref(
        JSON.parse(localStorage.getItem('user')).pegawai.ID_PEGAWAI
      ),
      namaPegawai: ref(
        JSON.parse(localStorage.getItem('user')).pegawai.NAMA_PEGAWAI
      ),
      idMember: ref(null),
      tglTransaksi: ref(''),
      masaBerlakuAktivasi: ref(''),
      jumlahPembayaran: ref(3000000),
    };

    const searchString = ref('');
    localStorage.setItem('NAMA_PEGAWAI', user.NAMA_PEGAWAI);

    function fetchInstructors() {
      rows.value = [];
      api
        .get('/api/aktivasi', {
          withCredentials: true,
        })
        .then((response) => {
          rows.value = response.data.data;
        })
        .catch(() => {
          $q.notify({
            message: 'gagal memuat data !',
            color: 'negative',
            position: 'top-right',
          });
        });
    }

    function showNewDialog() {
      newDialog.value = true;
    }

    function closeNewDialog() {
      newDialog.value = false;
      newData.idMember.value = '';
      newData.jumlahPembayaran.value = '';
    }
    function deleteData(id_instruktur) {
      api
        .delete(
          '/api/instruktur/' + id_instruktur,
          {
            // ID_INSTRUKTUR: id_instruktur,
          },
          { withCredentials: true }
        )
        .then(() => {
          $q.notify({
            message: 'Berhasil menghapus data',
            color: 'positive',
            icon: 'check_circle',
            position: 'top-right',
          });
          fetchInstructors();
        })
        .catch(() => {
          $q.notify({
            message: 'gagal menghapus data',
            color: 'negative',
            icon: 'cancel',
            position: 'top-right',
          });
        });
    }
    function deleteDataDialog(user) {
      $q.dialog({
        title: 'Confirm',
        message: 'Apa kamu ingin menghapus data ini ?',
        cancel: true,
        persistent: true,
        ok: {
          color: 'negative',
          label: 'Delete',
        },
      }).onOk(() => {
        deleteData(user.ID_INSTRUKTUR);
      });
    }

    function saveNewData() {
      api
        .post(
          '/api/aktivasi',
          {
            id_pegawai: newData.idPegawai.value,
            id_member: newData.idMember.value.ID_MEMBER,
            jumlah_pembayaran_transaksi_aktivasi:newData.jumlahPembayaran.value,
          },
          { withCredentials: true }
        )
        .then(() => {
          $q.notify({
            message: 'Berhasil menambahkan aktivasi baru',
            color: 'positive',
            icon: 'check_circle',
            position: 'top-right',
          });
          fetchInstructors();
        })
        .catch(() => {
          $q.notify({
            message: 'gagal menambahkan aktivasi baru',
            color: 'negative',
            icon: 'cancel',
            position: 'top-right',
          });
        });
      closeNewDialog();
    }

    function printDataDialog(member) {
      var myWindow = window.open('', 'printWindow', 'width=1200,height=700');
      var content = `<!DOCTYPE html>
<html>
<head>
	<title> Member Aktivasi</title>
	<style>
		.card {
		  width: 800px;
		  height: 300px;
		  background-color: #d9d9d9;
		  border-radius: 10px;
		  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
		  padding: 20px;
		  display: flex;
		  flex-direction: column;

		}

		.vip {

      background-repeat: no-repeat;
      background-size: cover;
		}
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      object-fit: cover;
      margin-bottom: 10px;
      display: inline-block;
      margin-right: 10px;
    }
    p {
  display: block;
  text-align: left;
  margin-top:4px;
}
p span {

  display: inline-block;
  width: 160px;
  font-weight: bold;
}
.footer {
  text-align: left;
  margin-left: 530px;
  margin-top: -100px;


}
.footers {
  display: inline-block;
  text-align: left;
  margin-left: 530px;
  margin-top: -60px;


}

	</style>
</head>
<body>
	<div class="card vip">


	  <img src="data:image/png;base64,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" alt="Member photo">

    <p>Jl.Centralpark No. 10 Yogyakarta</p>
    <div class="footer" style="text-align: left; ">
        <h4><span>No Struk</span> : ${member.ID_TRANSAKSI_AKTIVASI}</h4>
        <h4><span>Tanggal</span>  : ${member.TGL_TRANSAKSI_AKTIVASI}</h4>
      </div>
    <p></p>
    <p></p>
    <p></p>
    <p></p>
    <div>
      <p><span>Member</span> : ${member.ID_MEMBER}/ ${member.NAMA_MEMBER}</p>
      <p><span>Aktivasi Tahunan</span> : Rp. ${member.JUMLAH_PEMBAYARAN_TRANSAKSI_AKTIVASI},-</p>
      <p><span>Masa Aktif Member</span> : ${member.MASA_BERLAKU_TRANSAKSI_AKTIVASI}</p>

    </div>
    <div class="footers" style="text-align: left; ">
        <h4><span>Kasir</span> : ${member.ID_PEGAWAI} / ${member.NAMA_PEGAWAI}</h4>
      </div>


	</div>


</body>
</html>
`;
      myWindow.document.write(content);
      myWindow.print();
    }

    onMounted(() => {
      fetchInstructors();
      api
        .get('/api/pegawai/', {
          withCredentials: true,
        })
        .then((response) => {
          idPegawai.value = response.data.data;
        })
        .catch(() => {
          $q.notify({
            message: 'error tidak bisa mengambil data instruktur',
            color: 'negative',
            position: 'top-right',
          });
        });

      api
        .get('/api/member/', {
          withCredentials: true,
        })
        .then((response) => {
          idMember.value = response.data.data;
        })
        .catch(() => {
          $q.notify({
            message: 'eroor tidak bisa mengambil data kelas',
            color: 'negative',
            position: 'top-right',
          });
        });
    });

    return {
      columns,
      rows,
      deleteDataDialog,
      newData,
      newDialog,
      showNewDialog,
      closeNewDialog,
      saveNewData,
      searchString,
      fetchInstructors,
      printDataDialog,
      idPegawai,
      idMember,
      user,
    };
  },
});
</script>
