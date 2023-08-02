export const optionsDiscapacidades = [
    { id: 1, nombre: 'VISUAL' },
    { id: 2, nombre: 'AUDITIVA' },
    { id: 3, nombre: 'FÍSICA' },
    { id: 4, nombre: 'COGNITIVA/INTELECTUAL' },
    { id: 5, nombre: 'MENTAL/PSICOLÓGICA' },
    { id: 6, nombre: 'DEL HABLA/LENGUAJE' },
    { id: 7, nombre: 'MÚLTIPLE' },
    { id: 8, nombre: 'DEL ESPECTRO AUTISTA' },
    { id: 9, nombre: 'DE APRENDIZAJE' },
    { id: 10, nombre: 'EMOCIONAL/AFFECTIVA' },
    { id: 11, nombre: 'NEUROLÓGICA' },
    { id: 12, nombre: 'DE MOVILIDAD REDUCIDA' },
    { id: 13, nombre: 'DE COORDINACIÓN' },
    { id: 14, nombre: 'CRÓNICA' },
];

export const optionsNivelAcademico = [
    { nombre: 'SUBESPECIALIDAD MEDICA', value: 'SUBESPECIALIDAD_MEDICA' },
    { nombre: 'DOCTORADO', value: 'DOCTORADO' },
    { nombre: 'ESPECIALIDAD MEDICA', value: 'ESPECIALIDAD_MEDICA' },
    { nombre: 'MAESTRIA', value: 'MAESTRIA' },
    { nombre: 'ESPECIALIDAD', value: 'ESPECIALIDAD' },
    { nombre: 'LICENCIATURA', value: 'LICENCIATURA' },
    { nombre: 'TECNICO SUPERIOR', value: 'TECNICO' },
    { nombre: 'BACHILLERATO', value: 'BACHILLERATO' },
    { nombre: 'PRIMARIA', value: 'PRIMARIA' },
    { nombre: 'SECUNDARIA', value: 'SECUNDARIA' },
];

export const optionsFuncion = [
    { nombre: 'DIRECTIVO O JEFE DE DEPARTAMENTO'},
    { nombre: 'DOCENTE'},
    { nombre: 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR'},
    { nombre: 'INVESTIGADOR'},
    { nombre: 'AUXILIAR DE INVESTIGADOR'},
    { nombre: 'ADMINISTRATIVO'},
    { nombre: 'OTROS (SERVICIOS GENERALES)'},
];

export const optionsEstado = [
    { nombre: 'ACTIVO' }, { nombre: 'INACTIVO' }, { nombre: 'BAJA' }
];

export const optionsEstadoPlaza = [
    { nombre: 'ACTIVO', value: true }, { nombre: 'INACTIVO', value: false }
];

export const optionsSexo = [{ nombre: 'MASCULINO' }, { nombre: 'FEMENINO' }];

export const optionsEdad = [
    { nombre: 'Menos de 20 años ', value: [1,20] },
    { nombre: 'De 20 a 25 años', value: [20,25] },
    { nombre: 'De 26 a 30 años', value: [26,30] },
    { nombre: 'De 31 a 35 años', value: [31,35] },
    { nombre: 'De 36 a 40 años', value: [36,40] },
    { nombre: 'De 41 a 45 años', value: [41,45] },
    { nombre: 'De 46 a 50 años', value: [46,50] },
    { nombre: 'De 51 a 55 años', value: [51,55] },
    { nombre: 'De 56 a 60 años', value: [56,60] },
    { nombre: 'De 61 a 65 años', value: [61,65] },
    { nombre: 'Más de 65 años', value: [65,200] },
];

export const optionsAntiguedad = [
    { nombre: 'Menos de 5 años', value: [0,5] },
    { nombre: 'De 6 a 10 años', value: [6,10] },
    { nombre: 'De 11 a 15 años', value: [11,15] },
    { nombre: 'De 16 a 20 años', value: [16,20] },
    { nombre: 'De 21 a 25 años', value: [21,25] },
    { nombre: 'Más de 25 años', value: [25,100] },
];

export const optionsTipoMovimiento = [
    { nombre: 'INTERINATO' },
    { nombre: 'BASE' },
    { nombre: 'PREJUBILACION' },
];

export const optionsNombramiento = [
    { nombre: 'DOCENTE' },
    { nombre: 'ADMINISTRATIVO' },
];

export const optionsPuesto = [
    { nombre: 'DIRECTIVO O JEFE DE DEPARTAMENTO' },
    { nombre: 'DOCENTE' },
    { nombre: 'DOCENTE INVESTIGADOR O DOCENTE AUXILIAR DE INVESTIGADOR' },
    { nombre: 'INVESTIGADOR' },
    { nombre: 'AUXILIAR DE INVESTIGADOR' },
    { nombre: 'ADMINISTRATIVO' },
    { nombre: 'OTROS (SERVICIOS GENERALES)' },
];

export const optionsCategoria = [
    { nombre: 'TIEMPO COMPLETO' },
    { nombre: 'TRES CUARTOS DE TIEMPO' },
    { nombre: 'MEDIO TIEMPO' },
    { nombre: 'HORAS DE ASIGNATURA' },
    { nombre: 'DOCENTE INVESTIGADOR' },
];

export const optionsLengua = [
    { id: 1, nombre: "AKATEKO" },
    { id: 2, nombre: "AMUZGO" },
    { id: 3, nombre: "AWAKATEKO" },
    { id: 4, nombre: "AYAPANECO" },
    { id: 5, nombre: "CHATINO" },
    { id: 6, nombre: "CHICHIMECA JONAZ" },
    { id: 7, nombre: "CHINANTECO" },
    { id: 8, nombre: "CHOCHOLTECO" },
    { id: 9, nombre: "CHOL" },
    { id: 10, nombre: "CHONTAL DE OAXACA" },
    { id: 11, nombre: "CHONTAL DE TABASCO" },
    { id: 12, nombre: "CHUJ" },
    { id: 13, nombre: "COCHIMÍ" },
    { id: 14, nombre: "CORA" },
    { id: 15, nombre: "CUCAPÁ" },
    { id: 16, nombre: "CUICATECO" },
    { id: 17, nombre: "GUARIJÍO" },
    { id: 18, nombre: "HUAHUANCO" },
    { id: 19, nombre: "HUAVE" },
    { id: 20, nombre: "HUICHOL" },
    { id: 21, nombre: "IXCATECO" },
    { id: 22, nombre: "IXIL" },
    { id: 23, nombre: "JAKALTEKO" },
    { id: 24, nombre: "KAQCHIKEL" },
    { id: 25, nombre: "K'ICHE'" },
    { id: 26, nombre: "KICKAPOO" },
    { id: 27, nombre: "KILIWA" },
    { id: 28, nombre: "KUMIAI" },
    { id: 29, nombre: "LACANDÓN" },
    { id: 30, nombre: "MAM" },
    { id: 31, nombre: "MATLATZINCA" },
    { id: 32, nombre: "MAYA YUCATECO" },
    { id: 33, nombre: "MAYO" },
    { id: 34, nombre: "MAZAHUA" },
    { id: 35, nombre: "MAZATECO" },
    { id: 36, nombre: "MIXE" },
    { id: 37, nombre: "MIXTECO" },
    { id: 38, nombre: "NÁHUATL" },
    { id: 39, nombre: "OLUTECO" },
    { id: 40, nombre: "OTOMÍ" },
    { id: 41, nombre: "PAIPAI" },
    { id: 42, nombre: "PAME" },
    { id: 43, nombre: "PÁPAGO (O'ODHAM)" },
    { id: 44, nombre: "PIMA (NEVOME)" },
    { id: 45, nombre: "POPOLOCA" },
    { id: 46, nombre: "POPOLUCA DE LA SIERRA" },
    { id: 47, nombre: "PURÉPECHA" },
    { id: 48, nombre: "Q'ANJOB'AL" },
    { id: 49, nombre: "QATO'K (MOCHO')" },
    { id: 50, nombre: "Q'EQCHI'" },
    { id: 51, nombre: "SAYULTECO" },
    { id: 52, nombre: "SERI" },
    { id: 53, nombre: "TARAHUMARA" },
    { id: 54, nombre: "TEKO (TECTITECO)" },
    { id: 55, nombre: "TEPEHUA (TOTONACA)" },
    { id: 56, nombre: "TEPEHUANO DEL NORTE" },
    { id: 57, nombre: "TEPEHUANO DEL SUR" },
    { id: 58, nombre: "TEXISTEPEQUEÑO" },
    { id: 59, nombre: "TLAHUICA" },
    { id: 60, nombre: "TLAPANECA" },
    { id: 61, nombre: "TOJOLABAL" },
    { id: 62, nombre: "TOTONACO" },
    { id: 63, nombre: "TRIQUI" },
    { id: 64, nombre: "TSELTAL" },
    { id: 65, nombre: "TSOTSIL" },
    { id: 66, nombre: "YAQUI" },
    { id: 67, nombre: "ZAPOTECO" },
    { id: 68, nombre: "ZOQUE" },
];

