<template>
  <br />
  <center>
    <q-card class="small-card">
      <q-card-section>
        <q-item-label>Data instruktur</q-item-label>
      </q-card-section>
    </q-card>
  </center>
  <div class="q-ml-md">
    <q-btn color="green" label="Tambah Data" @click="showNewDialog" />
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
            color="positive"
            icon="edit"
            @click="showEditDialog(props.row)"
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
        <div class="text-h6 text-center">Tambah Data Instruktur</div>
      </q-card-section>
      <q-card-section >
        <q-form @submit.prevent="saveNewData" @reset="closeNewDialog" class="q-gutter-md">
          <q-input
            v-model="newData.nama_instruktur.value"
            label="Nama Instruktur"
            outlined
            lazy-rules
            :rules="[(val) => val.length > 0 || 'nama tidak boleh kosong']"
          />

          <q-input
            v-model="newData.alamat_instruktur.value"
            type="textarea"
            label="Alamat"
            outlined
            lazy-rules
            :rules="[(val) => val.length > 0 || 'alamat tidak boleh kosong']"
          />
          <q-input outlined  v-model="newData.tanggal_lahir_instruktur.value" mask="date" :rules="['date']" label="Tanggal Lahir ">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="newData.tanggal_lahir_instruktur.value">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-input
            v-model="newData.nomor_telepon.value"
            label="No Telepon"
            outlined
            lazy-rules
            :rules="[(val) => val.length > 0 || 'no telepon tidak boleh kosong']"
          />
          <q-input
            v-model="newData.email.value"
            label="email"
            outlined
            lazy-rules
            :rules="[(val) => val.length > 0 || 'username tidak boleh kosong']"
          />
          <q-input
            v-model="newData.password.value"
            label="Password"
            outlined
            lazy-rules
            :rules="[(val) => val.length > 0 || 'password tidak boleh kosong']"
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

    <q-dialog v-model="editDialog" persistent>
      <q-card style="min-width: 14cm;">
        <q-form @submit.prevent="saveEditData" @reset="closeEditDialog" class="q-gutter-md">
          <q-card-section class="q-pb-none">
            <div class="text-h6 text-center">Edit data instruktur</div>
          </q-card-section>
          <div class="row">
            <div class="col">
              <q-card-section class="q-pb-xs">
                <q-input
                  dense outlined v-model="editData.id_instruktur.value"
                  label="ID"
                  disable
                  />
              </q-card-section>

              <q-card-section class="q-pb-none q-pt-lg">
                <q-input
                  dense outlined v-model="editData.nama_instruktur.value"
                  label="Name"
                  :rules="[val => !!val || 'Nama tidak boleh kosong']" />
              </q-card-section>

              <q-card-section class="q-pb-none q-pt-sm">
                <q-input dense outlined v-model="editData.tanggal_lahir_instruktur.value" mask="date"
                  :rules="[val => !!val || 'tanggal lahir tidak boleh kosong', 'date']"
                  label="Tanggal Lahir"
                  >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="editData.tanggal_lahir_instruktur.value">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </q-card-section>

              <q-card-section class="q-pb-none q-pt-sm">
                <q-input
                 dense type="textarea"
                 outlined v-model="editData.alamat_instruktur.value"
                 label="Alamat"
                :rules="[val => !!val || 'alamat tidak boleh kosong']" />
              </q-card-section>

              <q-card-section class="q-pb-none q-pt-sm">
                <q-input
                 dense outlined v-model="editData.telepon_instruktur.value"
                 label="No Telepon"
                :rules="[val => !!val || 'no telepon tidak boleh kosong']" />
              </q-card-section>

              <q-card-section class="q-pb-none q-pt-sm">
                <q-input
                 dense outlined v-model="editData.username_instruktur.value"
                 label="Username"
                :rules="[val => !!val || 'username tidak boleh kosong']" />
              </q-card-section>

              <q-card-section class="q-pb-none q-pt-sm">
                <q-input
                 dense outlined v-model="editData.password_instruktur.value"
                 label="Password"
                :rules="[val => !!val || 'Description is missing']" />
              </q-card-section>

            </div>
          </div>
          <q-card-section>
            <div class="row justify-end">
              <q-btn class="q-mr-sm" label="Cancel" color="primary" flat @click="closeEditDialog()" />
              <q-btn type="submit" label="Save" color="primary" />
            </div>
          </q-card-section>
        </q-form>
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
        field: (row) => row.ID_INSTRUKTUR,
        format: (val) => `${val}`,
        sortable: true,
      },

      {
        name: 'name',
        required: false,
        label: 'Nama',
        align: 'left',
        field: (row) => row.NAMA_INSTRUKTUR,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: 'address',
        required: false,
        label: 'Alamat',
        align: 'left',
        field: (row) => row.ALAMAT_INSTRUKTUR,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: 'birth',
        required: false,
        label: 'Tanggal Lahir',
        align: 'left',
        field: (row) => row.TANGGAL_LAHIR_INSTRUKTUR,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: 'phone',
        required: false,
        label: 'No Telepon',
        align: 'left',
        field: (row) => row.NOMOR_TELEPON,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: 'email',
        required: false,
        label: 'Email',
        align: 'left',
        field: (row) => row.EMAIL,
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
    const editDialog = ref(false);

      const editData = {
        id_instruktur: ref(''),
        nama_instruktur: ref(''),
        tanggal_lahir_instruktur: ref(''),
        alamat_instruktur: ref(''),
        telepon_instruktur: ref(''),
        username_instruktur: ref(''),
        password_instruktur: ref(''),
      }

    const newData = {
      id_instruktur: ref(''),
      nama_instruktur: ref(''),
      alamat_instruktur: ref(''),
      tanggal_lahir_instruktur: ref(''),
      nomor_telepon: ref(''),
      email: ref(''),
      password: ref(''),

    };

    const searchString = ref('');
    function fetchInstructors() {
      rows.value = [];
      api
        .get('/api/instruktur', {
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

    function showEditDialog(user) {
      editDialog.value = true;
      editData.id_instruktur.value = user.ID_INSTRUKTUR;
      editData.nama_instruktur.value = user.NAMA_INSTRUKTUR;
      editData.tanggal_lahir_instruktur.value = user.TANGGAL_LAHIR_INSTRUKTUR;
      editData.alamat_instruktur.value = user.ALAMAT_INSTRUKTUR;
      editData.telepon_instruktur.value = user.TELEPON_INSTRUKTUR;
      editData.username_instruktur.value = user.USERNAME_INSTRUKTUR;
      editData.password_instruktur.value = user.PASSWORD_INSTRUKTUR;

    }
    function closeEditDialog() {
        editDialog.value = false
        editData.id_instruktur.value = '';
        editData.nama_instruktur.value = '';
        editData.tanggal_lahir_instruktur.value = '';
        editData.alamat_instruktur.value = '';
        editData.telepon_instruktur.value = '';
        editData.username_instruktur.value = '';
        editData.password_instruktur.value = '';
      }





    function closeNewDialog() {
      newDialog.value = false;
      newData.id_instruktur.value = '';
      newData.nama_instruktur.value = '';
      newData.tanggal_lahir_instruktur.value = '';
      newData.alamat_instruktur.value = '';
      newData.nomor_telepon.value = '';
      newData.username_instruktur.value = '';
      newData.password_instruktur.value = '';
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
            label: 'Delete'
          }
        }).onOk(() => {
          deleteData(user.ID_INSTRUKTUR)
        })
      }


    function saveNewData() {
      api
        .post(
          '/api/instruktur',
          {
            nama_instruktur: newData.nama_instruktur.value,
            alamat_instruktur: newData.alamat_instruktur.value,
            tanggal_lahir_instruktur: newData.tanggal_lahir_instruktur.value,
            nomor_telepon: newData.nomor_telepon.value,
            email: newData.email.value,
            password: newData.password.value,
          },
          { withCredentials: true }
        )
        .then(() => {
          $q.notify({
            message: 'Berhasil menambahkan instruktur baru',
            color: 'positive',
            icon: 'check_circle',
            position: 'top-right',
          });
          fetchInstructors();
        })
        .catch(() => {
          $q.notify({
            message: 'gagal menambahkan instruktur baru',
            color: 'negative',
            icon: 'cancel',
            position: 'top-right',
          });
        });
      closeNewDialog();
    }

    function saveEditData() {
       api.put('/api/instruktur/' + editData.id_instruktur.value,
         {
          nama_instruktur: editData.nama_instruktur.value,
          tanggal_lahir_instruktur: editData.tanggal_lahir_instruktur.value,
          alamat_instruktur: editData.alamat_instruktur.value,
          telepon_instruktur: editData.telepon_instruktur.value,
          username_instruktur: editData.username_instruktur.value,
          password_instruktur: editData.password_instruktur.value,
        }, { withCredentials: true })
          .then(() => {
            $q.notify({
              message: 'berhasil mengedit instruktur',
              color: 'positive',
              icon: 'check_circle',
              position: 'top-right'
            })
            fetchInstructors()
          })
          .catch(() => {
            $q.notify({
              message: 'gagal mengedit instruktur',
              color: 'negative',
              icon: 'cancel',
              position: 'top-right'
            })
          })
        closeEditDialog()
      }


    onMounted(() => {
      fetchInstructors();
    });
    return {
      columns,
      rows,
      deleteDataDialog,
      newData,
      newDialog,
      showNewDialog,
      editData,
      closeNewDialog,
      saveNewData,
      searchString,
      fetchInstructors,
      showEditDialog,
      editDialog,
      closeEditDialog,
      saveEditData,


    };
  },
});
</script>
