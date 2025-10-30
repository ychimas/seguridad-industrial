// SCORM API Wrapper - Versión 1.2
// Generado por SF CoursePress

class SCORMAPI {
  constructor() {
    this.API = null;
    this.initialized = false;
    this.findAPI();
  }

  findAPI() {
    let win = window;
    let attempts = 0;
    const maxAttempts = 10;

    while (!win.API && win.parent && win.parent != win && attempts < maxAttempts) {
      attempts++;
      win = win.parent;
    }

    if (win.API) {
      this.API = win.API;
      this.initialize();
    }
  }

  initialize() {
    if (!this.API) return false;

    const result = this.API.LMSInitialize('');
    if (result === 'true') {
      this.initialized = true;
      console.log('SCORM API inicializada correctamente');
      return true;
    }
    return false;
  }

  getValue(parameter) {
    if (!this.API || !this.initialized) return '';
    return this.API.LMSGetValue(parameter);
  }

  setValue(parameter, value) {
    if (!this.API || !this.initialized) return false;
    const result = this.API.LMSSetValue(parameter, value);
    return result === 'true';
  }

  commit() {
    if (!this.API || !this.initialized) return false;
    const result = this.API.LMSCommit('');
    return result === 'true';
  }

  finish() {
    if (!this.API || !this.initialized) return false;
    const result = this.API.LMSFinish('');
    this.initialized = false;
    return result === 'true';
  }

  // Métodos de conveniencia
  setCompleted() {
    this.setValue('cmi.core.lesson_status', 'completed');
    this.commit();
  }

  setCourseComplete() {
    this.setValue('cmi.core.lesson_status', 'completed');
    this.setValue('cmi.core.score.raw', '100');
    this.commit();
  }

  setProgress(percentage) {
    this.setValue('cmi.core.score.raw', percentage.toString());
    this.commit();
  }

  setScore(score, min = 0, max = 100) {
    this.setValue('cmi.core.score.raw', score.toString());
    this.setValue('cmi.core.score.min', min.toString());
    this.setValue('cmi.core.score.max', max.toString());
    this.commit();
  }

  getStudentName() {
    return this.getValue('cmi.core.student_name');
  }

  getStudentId() {
    return this.getValue('cmi.core.student_id');
  }

  getLessonStatus() {
    return this.getValue('cmi.core.lesson_status');
  }
}

// Inicializar SCORM API globalmente
window.scormAPI = new SCORMAPI();

// Cerrar sesión SCORM al salir
window.addEventListener('beforeunload', () => {
  if (window.scormAPI) {
    window.scormAPI.finish();
  }
});