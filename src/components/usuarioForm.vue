<template>
  <div class="container-lg pt-4 my-3">
    <div class="card shadow-5 border-round-2xl overflow-hidden">
      <div class="d-flex relative card-header py-0 pe-0">
        <span class="flex text-center">
          <i class="bi bi-person-fill-gear fw-bold h1 my-0" v-if="isEdit"></i>
          <i class="bi bi-person-fill-add fw-bold h1 my-0" v-else></i>
          <span class="fw-bold h4 align-self-center ms-3 my-0"> {{ isEdit ? ' Editar' : 'Registrar' }} Usuario </span>
        </span>
        <Button icon="pi pi-times" severity="danger" size="small" @click="goBack"
          class="ms-auto border-noround float-end hover:bg-red-500 hover:text-white" text style="height: 48px"> </Button>
      </div>
      <form id="form">
        <div class="card-body">
          <div class="grid">
            <div class="col-12">
              <Button v-if="isEdit" :icon="data.locked ? 'pi pi-lock-open' : 'pi pi-lock'" class="float-end border-none me-2"
                @click="lock_unlock" :label="data.locked ? 'Desbloquear' : 'Bloquear'"
                v-tooltip.top="data.locked ? 'Desbloquear al usuario permitirá que pueda iniciar sesión en el sistema':'Bloquear al usuario evitará que pueda iniciar sesión en el sistema, pero no eliminará sus datos'"
                :class="editingSelf == true ? 'bg-gray-700 border-none' : data.locked ? 'bg-green-700' : 'bg-red-700'" :disabled="editingSelf == true" />
            </div>
            <!-- Input correo -->
            <div class="col-12 md:col-offset-3 md:col-6">
              <label for="curp" class="form-label">Correo electrónico<b class="p-error">*</b></label>
              <InputText v-model="data.email" autocomplete="none" placeholder="Direccion de correo electrónico"
                :class="['w-full', { 'p-invalid': error.email && validated }]" :disabled="isEdit" />
              <small v-if="validated" class="p-error">{{ error.email || '' }}</small>
            </div>
            <!-- Input nombre-->
            <div class="col-12 md:col-offset-3 md:col-6">
              <label for="nombre" class="form-label">Nombre(s)<b class="p-error">*</b></label>
              <InputText v-model="data.nombre" placeholder="Nombre de la persona, ej: Juan"
                :class="['w-full', { 'p-invalid': error.nombre && validated }]" id="nombre" />
              <small v-if="validated" class="p-error">{{ error.nombre || '' }}</small>
            </div>
            <!-- Input apellidos -->
            <div class="col-12 md:col-offset-3 md:col-6">
              <label for="rfc" class="form-label">Apellidos<b class="p-error">*</b></label>
              <InputText v-model="data.apellidos" placeholder="Apellidos de la persona, ej: Perez Lopez"
                :class="['w-full', { 'p-invalid': error.apellidos && validated }]" />
              <small v-if="validated" class="p-error">{{ error.apellidos || '' }}</small>
            </div>
            <!-- Dropdown Rol -->
            <div class="col-12 md:col-offset-3 md:col-6">
              <label for="genero" class="form-label">Rol<b class="text-danger">*</b></label>
              <Dropdown v-model="data.rol" :options="roles" optionLabel="nombre" optionValue="value"
                placeholder="Elija el rol cuidadosamente" :class="['w-full', { 'p-invalid': error.rol && validated }]"
                showClear :disabled="editingSelf" />
              <small v-if="validated" class="p-error">{{ error.rol || '' }}</small>
            </div>
            <!-- Descripción del Rol -->
            <section class="col-12">
              <small><b class="text-danger">*</b> Campos obligatorios</small>
            </section>
            <div class="col-12" v-if="data.rol == 'ROLE_ADMIN'">
              <strong class="text-color">Permisos del rol:</strong>
              <span class="block text-green-700 font-medium"><i class="pi pi-check-circle"></i> Modificar configuraciones de la plataforma</span>
              <span class="block text-green-700 font-medium"><i class="pi pi-check-circle"></i> Crear, Eliminar y Modificar  Usuarios</span>
              <span class="block text-green-700 font-medium"><i class="pi pi-check-circle"></i> Crear, Eliminar y Modificar  Empleados</span>
              <span class="block text-green-700 font-medium"><i class="pi pi-check-circle"></i> Crear, Eliminar y Modificar  Plazas</span>
              <span class="block text-green-700 font-medium"><i class="pi pi-check-circle"></i> Crear, Eliminar y Modificar  Departamentos</span>
              <span class="block text-green-700 font-medium"><i class="pi pi-check-circle"></i> Realizar consultas avanzadas</span>
              <span class="block text-green-700 font-medium"><i class="pi pi-check-circle"></i> Generar reportes</span>
              <span class="block text-green-700 font-medium"><i class="pi pi-check-circle"></i> Consultar expedientes de Empleados</span>
              <span class="block text-green-700 font-medium"><i class="pi pi-check-circle"></i> Editar preferencias</span>
              <span class="block text-green-700 font-medium"><i class="pi pi-check-circle"></i> Cambiar contraseña</span>
            </div>
            <div class="col-12" v-if="data.rol == 'ROLE_EMPLEADO_HR'">
              <strong class="text-color">Permisos del rol:</strong>
              <span class="block text-red-700 font-medium"><i class="pi pi-times-circle"></i> Modificar configuraciones de la plataforma</span>
              <span class="block text-red-700 font-medium"><i class="pi pi-times-circle"></i> Crear, Eliminar y Modificar  Usuarios</span>
              <span class="block text-green-700 font-medium"><i class="pi pi-check-circle"></i> Crear, Eliminar y Modificar  Empleados</span>
              <span class="block text-green-700 font-medium"><i class="pi pi-check-circle"></i> Crear, Eliminar y Modificar  Plazas</span>
              <span class="block text-green-700 font-medium"><i class="pi pi-check-circle"></i> Crear, Eliminar y Modificar  Departamentos</span>
              <span class="block text-green-700 font-medium"><i class="pi pi-check-circle"></i> Realizar consultas avanzadas</span>
              <span class="block text-green-700 font-medium"><i class="pi pi-check-circle"></i> Generar reportes</span>
              <span class="block text-green-700 font-medium"><i class="pi pi-check-circle"></i> Consultar expedientes de Empleados</span>
              <span class="block text-green-700 font-medium"><i class="pi pi-check-circle"></i> Editar preferencias</span>
              <span class="block text-green-700 font-medium"><i class="pi pi-check-circle"></i> Cambiar contraseña</span>
            </div>
            <div class="col-12" v-if="data.rol == 'ROLE_ASISTENTE_HR'">
              <strong class="text-color">Permisos del rol:</strong>
              <span class="block text-red-700 font-medium"><i class="pi pi-times-circle"></i> Modificar configuraciones de la plataforma</span>
              <span class="block text-red-700 font-medium"><i class="pi pi-times-circle"></i> Crear, Eliminar y Modificar  Usuarios</span>
              <span class="block text-yellow-700 font-medium"><i class="pi pi-check-circle"></i> Crear, <span class="line-through text-red-700">Eliminar</span> y Modificar Empleados</span>
              <span class="block text-yellow-700 font-medium"><i class="pi pi-check-circle"></i> Crear, <span class="line-through text-red-700">Eliminar</span> y Modificar Plazas</span>
              <span class="block text-yellow-700 font-medium"><i class="pi pi-check-circle"></i> Crear, <span class="line-through text-red-700">Eliminar</span> y Modificar Departamentos</span>
              <span class="block text-green-700 font-medium"><i class="pi pi-check-circle"></i> Realizar consultas avanzadas</span>
              <span class="block text-green-700 font-medium"><i class="pi pi-check-circle"></i> Generar reportes</span>
              <span class="block text-green-700 font-medium"><i class="pi pi-check-circle"></i> Consultar expedientes de Empleados</span>
              <span class="block text-green-700 font-medium"><i class="pi pi-check-circle"></i> Editar preferencias</span>
              <span class="block text-green-700 font-medium"><i class="pi pi-check-circle"></i> Cambiar contraseña</span>
            </div>
            <div class="col-12" v-if="data.rol == 'ROLE_PLANEACION'">
              <strong class="text-color">Permisos del rol:</strong>
              <span class="block text-red-700 font-medium"><i class="pi pi-times-circle"></i> Modificar configuraciones de la plataforma</span>
              <span class="block text-red-700 font-medium"><i class="pi pi-times-circle"></i> Crear, Eliminar y Modificar  Usuarios</span>
              <span class="block text-red-700 font-medium"><i class="pi pi-times-circle"></i> Crear, Eliminar y Modificar  Empleados</span>
              <span class="block text-red-700 font-medium"><i class="pi pi-times-circle"></i> Crear, Eliminar y Modificar  Plazas</span>
              <span class="block text-red-700 font-medium"><i class="pi pi-times-circle"></i> Crear, Eliminar y Modificar  Departamentos</span>
              <span class="block text-green-700 font-medium"><i class="pi pi-check-circle"></i> Realizar consultas avanzadas</span>
              <span class="block text-green-700 font-medium"><i class="pi pi-check-circle"></i> Generar reportes</span>
              <span class="block text-red-700 font-medium"><i class="pi pi-times-circle"></i> Consultar expedientes de Empleados</span>
              <span class="block text-green-700 font-medium"><i class="pi pi-check-circle"></i> Editar preferencias</span>
              <span class="block text-green-700 font-medium"><i class="pi pi-check-circle"></i> Cambiar contraseña</span>
            </div>
            <div class="col-12" v-if="data.rol == 'ROLE_EMPLEADO'">
              <strong class="text-color">Permisos del rol:</strong>
              <span class="block text-red-700 font-medium"><i class="pi pi-times-circle"></i> Modificar configuraciones de la plataforma</span>
              <span class="block text-red-700 font-medium"><i class="pi pi-times-circle"></i> Crear, Eliminar y Modificar  Usuarios</span>
              <span class="block text-red-700 font-medium"><i class="pi pi-times-circle"></i> Crear, Eliminar y Modificar  Empleados</span>
              <span class="block text-red-700 font-medium"><i class="pi pi-times-circle"></i> Crear, Eliminar y Modificar  Plazas</span>
              <span class="block text-red-700 font-medium"><i class="pi pi-times-circle"></i> Crear, Eliminar y Modificar  Departamentos</span>
              <span class="block text-red-700 font-medium"><i class="pi pi-times-circle"></i> Realizar consultas avanzadas</span>
              <span class="block text-red-700 font-medium"><i class="pi pi-times-circle"></i> Generar reportes</span>
              <span class="block text-green-700 font-medium"><i class="pi pi-check-circle"></i> Consultar expediente (propio)</span>
              <span class="block text-green-700 font-medium"><i class="pi pi-check-circle"></i> Editar preferencias</span>
              <span class="block text-green-700 font-medium"><i class="pi pi-check-circle"></i> Cambiar contraseña</span>
            </div>
          </div>
        </div>
        <div class="card-footer d-flex">
          <Button v-if="isEdit" icon="pi pi-trash" class="me-2" label="Eliminar" @click="eliminar" severity="danger" :disabled="editingSelf == true" :class="editingSelf == true ? 'bg-gray-700 border-none' : 'bg-red-700'"/>
          <Button icon="pi pi-check" id="submitButton" class="me-2 ms-auto" label="Guardar" @click="submit" />
          <Button icon="pi pi-times" class="ms-2 float-end" severity="secondary" label="Cancelar" @click="cancelar" />
        </div>
      </form>
    </div>

    <div class="card mt-5 border-round-2xl overflow-hidden shadow-5">
            <Panel header="Tabla de roles y permisos" toggleable collapsed>
                <div class="container table-responsive">
                    <table class="table table-hover table-sm table-bordered" id="empleados">
                    <thead>
                        <tr class="text-center vertical-align-middle">
                            <th colspan="2"></th>
                            <th colspan="5">Rol de usuario</th>
                        </tr>
                        <tr class="text-center vertical-align-middle">
                            <th colspan="2">Función</th>
                            <th scope="col">Administrador</th>
                            <th scope="col">Empleado de RH</th>
                            <th scope="col">Auxiliar de RH</th>
                            <th scope="col">Empleado de Planeación</th>
                            <th scope="col">Empleado General</th>
                        </tr>
                    </thead>
                    <tbody class="text-center vertical-align-middle table-group-divider">
                        <tr>
                          <th scope="row" colspan="2">Configuración de la plataforma</th>
                          <td class="text-green-700"><i class="pi pi-check-circle"></i></td>
                          <td class="text-300"><i class="pi pi-minus"></i></td>
                          <td class="text-300"><i class="pi pi-minus"></i></td>
                          <td class="text-300"><i class="pi pi-minus"></i></td>
                          <td class="text-300"><i class="pi pi-minus"></i></td>
                        </tr>


                        <tr>
                          <th scope="row" rowspan="4">Usuarios</th>
                        </tr>
                        <tr>
                          <td class="text-left">Crear</td>
                          <td class="text-green-700"><i class="pi pi-check-circle"></i></td>
                          <td class="text-300"><i class="pi pi-minus"></i></td>
                          <td class="text-300"><i class="pi pi-minus"></i></td>
                          <td class="text-300"><i class="pi pi-minus"></i></td>
                          <td class="text-300"><i class="pi pi-minus"></i></td>
                        </tr>
                        <tr>
                          <td class="text-left">Modificar</td>
                          <td class="text-green-700"><i class="pi pi-check-circle"></i></td>
                          <td class="text-300"><i class="pi pi-minus"></i></td>
                          <td class="text-300"><i class="pi pi-minus"></i></td>
                          <td class="text-300"><i class="pi pi-minus"></i></td>
                          <td class="text-300"><i class="pi pi-minus"></i></td>
                        </tr>
                        <tr>
                          <td class="text-left">Eliminar</td>
                          <td class="text-green-700"><i class="pi pi-check-circle"></i></td>
                          <td class="text-300"><i class="pi pi-minus"></i></td>
                          <td class="text-300"><i class="pi pi-minus"></i></td>
                          <td class="text-300"><i class="pi pi-minus"></i></td>
                          <td class="text-300"><i class="pi pi-minus"></i></td>
                        </tr>


                        <tr>
                          <th scope="row" rowspan="4">Empleados</th>
                        </tr>
                        <tr>
                          <td class="text-left">Crear</td>
                          <td class="text-green-700"><i class="pi pi-check-circle"></i></td>
                          <td class="text-green-700"><i class="pi pi-check-circle"></i></td>
                          <td class="text-green-700"><i class="pi pi-check-circle"></i></td>
                          <td class="text-300"><i class="pi pi-minus"></i></td>
                          <td class="text-300"><i class="pi pi-minus"></i></td>
                        </tr>
                        <tr>
                          <td class="text-left">Modificar</td>
                          <td class="text-green-700"><i class="pi pi-check-circle"></i></td>
                          <td class="text-green-700"><i class="pi pi-check-circle"></i></td>
                          <td class="text-green-700"><i class="pi pi-check-circle"></i></td>
                          <td class="text-300"><i class="pi pi-minus"></i></td>
                          <td class="text-300"><i class="pi pi-minus"></i></td>
                        </tr>
                        <tr>
                          <td class="text-left">Eliminar</td>
                          <td class="text-green-700"><i class="pi pi-check-circle"></i></td>
                          <td class="text-green-700"><i class="pi pi-check-circle"></i></td>
                          <td class="text-300"><i class="pi pi-minus"></i></td>
                          <td class="text-300"><i class="pi pi-minus"></i></td>
                          <td class="text-300"><i class="pi pi-minus"></i></td>
                        </tr>


                        <tr>
                          <th scope="row" rowspan="4">Plazas</th>
                        </tr>
                        <tr>
                          <td class="text-left">Crear</td>
                          <td class="text-green-700"><i class="pi pi-check-circle"></i></td>
                          <td class="text-green-700"><i class="pi pi-check-circle"></i></td>
                          <td class="text-green-700"><i class="pi pi-check-circle"></i></td>
                          <td class="text-300"><i class="pi pi-minus"></i></td>
                          <td class="text-300"><i class="pi pi-minus"></i></td>
                        </tr>
                        <tr>
                          <td class="text-left">Modificar</td>
                          <td class="text-green-700"><i class="pi pi-check-circle"></i></td>
                          <td class="text-green-700"><i class="pi pi-check-circle"></i></td>
                          <td class="text-green-700"><i class="pi pi-check-circle"></i></td>
                          <td class="text-300"><i class="pi pi-minus"></i></td>
                          <td class="text-300"><i class="pi pi-minus"></i></td>
                        </tr>
                        <tr>
                          <td class="text-left">Eliminar</td>
                          <td class="text-green-700"><i class="pi pi-check-circle"></i></td>
                          <td class="text-green-700"><i class="pi pi-check-circle"></i></td>
                          <td class="text-300"><i class="pi pi-minus"></i></td>
                          <td class="text-300"><i class="pi pi-minus"></i></td>
                          <td class="text-300"><i class="pi pi-minus"></i></td>
                        </tr>


                        <tr>
                          <th scope="row" rowspan="4">Departamentos</th>
                        </tr>
                        <tr>
                          <td class="text-left">Crear</td>
                          <td class="text-green-700"><i class="pi pi-check-circle"></i></td>
                          <td class="text-green-700"><i class="pi pi-check-circle"></i></td>
                          <td class="text-300"><i class="pi pi-minus"></i></td>
                          <td class="text-300"><i class="pi pi-minus"></i></td>
                          <td class="text-300"><i class="pi pi-minus"></i></td>
                        </tr>
                        <tr>
                          <td class="text-left">Modificar</td>
                          <td class="text-green-700"><i class="pi pi-check-circle"></i></td>
                          <td class="text-green-700"><i class="pi pi-check-circle"></i></td>
                          <td class="text-300"><i class="pi pi-minus"></i></td>
                          <td class="text-300"><i class="pi pi-minus"></i></td>
                          <td class="text-300"><i class="pi pi-minus"></i></td>
                        </tr>
                        <tr>
                          <td class="text-left">Eliminar</td>
                          <td class="text-green-700"><i class="pi pi-check-circle"></i></td>
                          <td class="text-green-700"><i class="pi pi-check-circle"></i></td>
                          <td class="text-300"><i class="pi pi-minus"></i></td>
                          <td class="text-300"><i class="pi pi-minus"></i></td>
                          <td class="text-300"><i class="pi pi-minus"></i></td>
                        </tr>


                        <tr>
                          <th scope="row" colspan="2">Consulta avanzada</th>
                          <td class="text-green-700"><i class="pi pi-check-circle"></i></td>
                          <td class="text-green-700"><i class="pi pi-check-circle"></i></td>
                          <td class="text-300"><i class="pi pi-minus"></i></td>
                          <td class="text-green-700"><i class="pi pi-check-circle"></i></td>
                          <td class="text-300"><i class="pi pi-minus"></i></td>
                        </tr>

                        <tr>
                          <th scope="row" colspan="2">Reportes</th>
                          <td class="text-green-700"><i class="pi pi-check-circle"></i></td>
                          <td class="text-green-700"><i class="pi pi-check-circle"></i></td>
                          <td class="text-300"><i class="pi pi-minus"></i></td>
                          <td class="text-green-700"><i class="pi pi-check-circle"></i></td>
                          <td class="text-300"><i class="pi pi-minus"></i></td>
                        </tr>

                        <tr>
                          <th scope="row" colspan="2">Preferencias</th>
                          <td class="text-green-700"><i class="pi pi-check-circle"></i></td>
                          <td class="text-green-700"><i class="pi pi-check-circle"></i></td>
                          <td class="text-green-700"><i class="pi pi-check-circle"></i></td>
                          <td class="text-green-700"><i class="pi pi-check-circle"></i></td>
                          <td class="text-green-700"><i class="pi pi-check-circle"></i></td>
                        </tr>

                        <tr>
                          <th scope="row" colspan="2">Cambiar contraseña</th>
                          <td class="text-green-700"><i class="pi pi-check-circle"></i></td>
                          <td class="text-green-700"><i class="pi pi-check-circle"></i></td>
                          <td class="text-green-700"><i class="pi pi-check-circle"></i></td>
                          <td class="text-green-700"><i class="pi pi-check-circle"></i></td>
                          <td class="text-green-700"><i class="pi pi-check-circle"></i></td>
                        </tr>

                        <tr>
                          <th scope="row" colspan="2">Consultar expedientes</th>
                          <td class="text-green-700"><i class="pi pi-check-circle"></i></td>
                          <td class="text-green-700"><i class="pi pi-check-circle"></i></td>
                          <td class="text-green-700"><i class="pi pi-check-circle"></i></td>
                          <td class="text-300"><i class="pi pi-minus"></i></td>
                          <td class="text-yellow-700"><i class="pi pi-check-circle"></i></td>
                        </tr>
                    </tbody>
                </table>
                </div>

                <a class="btn btn-light" href="/misc/roles.pdf" target="_blank" download>
                  <i class="bi bi-download"></i>
                  Descargar tabla
                </a>

            </Panel>
        </div>

  </div>
</template>

<script>
import { defineComponent, onMounted, ref, watch, nextTick } from 'vue';
import { useStore } from '@/stores/adminStore';
import Swal from 'sweetalert2';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { useAlerts } from '@/components/useAlerts';
import InputText from 'primevue/inputtext';
import cookies from 'js-cookie';

export default defineComponent({
  name: 'UsuarioForm',
  watch: {},
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    //prop to define if form is in edit mode or create mode
    const isEdit = ref(props.isEdit);
    // const options from options.js
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const validated = ref(false);
    const isValid = ref(false);
    const error = ref({});
    const data = ref({});
    const id = ref(null);
    const isLocked = ref(false);
    const alertas = useAlerts();
    const editingSelf = ref(false);
    const { showToast, showSuccessAlert, showConfirmAlert, showErrorAlert, showLoading, closeLoading } = useAlerts();
    const roles = [
      { nombre: 'ADMINISTRADOR', value: 'ROLE_ADMIN' },
      { nombre: 'EMPLEADO DE RECURSOS HUMANOS', value: 'ROLE_EMPLEADO_HR' },
      { nombre: 'ASISTENTE DE RECURSOS HUMANOS', value: 'ROLE_ASISTENTE_HR' },
      { nombre: 'EMPLEADO DE PLANEACIÓN', value: 'ROLE_PLANEACION' },
      { nombre: 'EMPLEADO GENERAL', value: 'ROLE_EMPLEADO' },
    ];

    const getData = async () => {
      id.value = route.params.id;
      showLoading();
      store.getUsuario(id.value).then(() => {
        data.value = store.data;
        validated.value = true;
        isLocked.value = data.value.locked;
        editingSelf.value = data.value.email == cookies.get('email');
        validate();
        closeLoading();
      });

    };

    onMounted(() => {
      if (isEdit.value) {
        getData();
      }
    });

    const validate = () => {
      //Set validated to true to display the errors if any
      validated.value = true;
      //Reset isValid to true
      isValid.value = true;
      //run all the validations, if any fails, isValid will be false

      if (data.value.nombre == null || data.value.nombre == undefined || data.value.nombre == '') {
        error.value.nombre = 'El nombre es obligatorio';
        isValid.value = false;
      } else {
        error.value.nombre = '';
      }

      if (data.value.apellidos == null || data.value.apellidos == undefined || data.value.apellidos == '') {
        error.value.apellidos = 'Los apellidos son obligatorios';
        isValid.value = false;
      } else {
        error.value.apellidos = '';
      }

      if (data.value.email == null || data.value.email == undefined || data.value.email == '') {
        error.value.email = 'El correo electrónico es obligatorio';
        isValid.value = false;
      } else if (!data.value.email.includes('@')) {
        error.value.email = 'El correo electrónico debe ser válido';
        isValid.value = false;
      } else {
        error.value.email = '';
      }

      if (data.value.rol == null || data.value.rol == undefined || data.value.rol == '') {
        error.value.rol = 'El rol es obligatorio';
        isValid.value = false;
      } else {
        error.value.rol = '';
      }
      return isValid.value;
    };
    const submit = () => {
      if (validate() == false)
      {
        showToast('error', 'Verifique los campos marcados en rojo');
        return;
      }
      let payload = { ...data.value };

      if (isEdit.value) {
        var id = data.value.id;
        //Ask for confirmation
        showConfirmAlert('¿Estás seguro?', 'Se actualizarán los datos del usuario', 'warning', 'Sí, actualizar', 'No, cancelar').then((isConfirmed) => {
          //If the user confirms, try to update the employee
          if (isConfirmed) {
            store.editarUsuario(id, payload)
              .then((response) => {
                console.log(response);
                if (response.status == 200) {
                  showSuccessAlert('¡Éxito!', 'El usuario se ha actualizado correctamente', 'success', 'Aceptar').then(() => {
                    router.push({ name: 'usuarios' });
                  });
                } else {
                  showErrorAlert('Error', response.response.data, 'error', 'Aceptar');
                }
              })
              .catch((error) => {
                //If there is an error, show an error alert
                showToast('error', 'Ocurrió un error al actualizar el usuario');
              });
          } else {
            //If the user cancels, show a toast
            showToast('info', 'No se actualizaron los datos');
          }
        });
      } else {
        //Ask for confirmation
        showConfirmAlert('¿Estás seguro?', 'Se registrarán los datos del usuario', 'warning', 'Sí, registrar', 'No, cancelar').then((isConfirmed) => {
          //If the user confirms, try to add the employee

          //transform data.value to JSON

          if (isConfirmed) {
            store.registrarUsuario(payload)
              .then((response) => {
                console.log(response);
                if (response.status == 200) {
                  //If the employee is added, show a success alert and redirect to the employees list
                  showSuccessAlert('¡Registro exitoso!', 'El usuario recibirá un correo en unos minutos, revise su bandeja de entrada y su bandeja de spam', 'success', 'Aceptar').then(() => {
                    router.push({ name: 'usuarios' });
                  });
                } else {
                  showErrorAlert('Error', response.response.data, 'error', 'Aceptar');
                }
              })
              .catch((error) => {
                //If there is an error, show an error alert
                showToast('error', 'Ocurrió un error al registrar el usuario');
              });
          } else {
            //If the user cancels, show a toast
            showToast('info', 'No se registraron los datos');
          }
        });
      }
    };

    const cancelar = () => {
      showConfirmAlert('¿Deseas cancelar?', 'Los cambios no guardados se perderán', 'question', 'Sí, cancelar', 'No, regresar').then((isConfirmed) => {
        if (isConfirmed) {
          router.push({ name: 'usuarios' });
        }
      });
    };

    const lock_unlock = () => {
      let id = data.value.id;
      if (data.value.locked == true) {
        alertas.showLoading('Desbloqueando usuario');
        store.desbloquearUsuario(id).then(() => {
          alertas.closeLoading();
          alertas.showSuccessAlert('Éxito', 'Usuario desbloqueado');
          getData();
        }).catch((error) => {
          if (error.code === "ERR_NETWORK") {
            alertas.showErrorAlert('Error', 'No se pudo conectar con el servidor');
          } else {
            alertas.showErrorAlert('Error', 'Ocurrió un error inesperado');
          }
        });
      } else {
        alertas.showLoading('Bloqueando usuario');
        store.bloquearUsuario(id).then(() => {
          alertas.closeLoading();
          alertas.showSuccessAlert('Éxito', 'Usuario bloqueado');
          getData();
        }).catch((error) => {
          alertas.closeLoading();
          if (error.code === "ERR_NETWORK") {
            alertas.showErrorAlert('Error', 'No se pudo conectar con el servidor');
          } else {
            alertas.showErrorAlert('Error', 'Ocurrió un error inesperado');
          }
        })
      }
    }

    const eliminar = () => {
      Swal.fire({
        title: 'Se requiere confirmación',
        text: 'Esta acción eliminará al usuario de forma permanente y no se puede revertir, puedes bloquear al usuario en su lugar y reactivarlo cuando lo desees.',
        icon: 'warning',
        iconColor: '#dc3545',
        input: 'checkbox',
        inputValue: 0,
        inputPlaceholder: 'Entiendo, quiero continuar',
        confirmButtonText: 'Continuar <i class="bi bi-shield-exclamation"></i>',
        confirmButtonColor: '#dc3545',
        cancelButtonText: 'Cancelar</i>',
        showCancelButton: true,
        inputValidator: (result) => {
          return !result && 'Debes confirmar que entiendes las consecuencias de esta acción';
        },
      }).then((result) => {
        if (result.value) {
          console.log(data.value.id);
          store.eliminarUsuario(data.value.id)
            .then((code) => {
              if (code == 200) {
                Swal.fire({
                  icon: 'success',
                  title: '¡Éxito!',
                  text: 'El usuario ha sido eliminado de forma permanente',
                }).then(() => {
                  router.push({ name: 'usuarios' });
                });
              } else {
                showErrorAlert('Error', 'Ocurrió un error al eliminar el usuario', 'error', 'Aceptar');
              }
            })
            .catch((error) => {
              showToast('error', 'Ocurrió un error al eliminar el usuario');
            });
        }
      });
    };

    return {
      data,
      validate,
      submit,
      cancelar,
      error,
      validated,
      isEdit,
      eliminar,
      roles,
      isLocked,
      lock_unlock,
      editingSelf,
      goBack: () => router.go(-1),
    };
  },
  components: { InputText },
});
</script>

<style>
.form-control {
  padding: 12px !important;
}
</style>
