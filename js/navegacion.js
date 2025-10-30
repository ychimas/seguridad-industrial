// Sistema de Navegación del Curso
// Generado por SF CoursePress

class CursoNavegacion {
  constructor(config) {
    this.config = config;
    this.currentLesson = 0;
    this.currentMoment = 0;
    this.completedMoments = new Set();
    this.init();
  }

  init() {
    this.loadProgress();
    this.setupEventListeners();
    this.updateProgress();
  }

  setupEventListeners() {
    const nextBtn = document.getElementById('btn-siguiente');
    const prevBtn = document.getElementById('btn-anterior');

    if (nextBtn) {
      nextBtn.addEventListener('click', () => this.siguiente());
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => this.anterior());
    }
  }

  siguiente() {
    this.markCurrentAsCompleted();
    
    const currentLesson = this.config.lecciones[this.currentLesson];
    
    if (this.currentMoment < currentLesson.moments.length - 1) {
      this.currentMoment++;
    } else if (this.currentLesson < this.config.lecciones.length - 1) {
      this.currentLesson++;
      this.currentMoment = 0;
    } else {
      this.completarCurso();
      return;
    }

    this.navegarA(this.currentLesson, this.currentMoment);
  }

  anterior() {
    if (this.currentMoment > 0) {
      this.currentMoment--;
    } else if (this.currentLesson > 0) {
      this.currentLesson--;
      const prevLesson = this.config.lecciones[this.currentLesson];
      this.currentMoment = prevLesson.moments.length - 1;
    } else {
      return;
    }

    this.navegarA(this.currentLesson, this.currentMoment);
  }

  navegarA(lessonIndex, momentIndex) {
    const lesson = this.config.lecciones[lessonIndex];
    const moment = lesson.moments[momentIndex];
    
    this.currentLesson = lessonIndex;
    this.currentMoment = momentIndex;
    
    this.saveProgress();
    this.updateProgress();
    
    window.location.href = moment.file;
  }

  markCurrentAsCompleted() {
    const key = `${this.currentLesson}-${this.currentMoment}`;
    this.completedMoments.add(key);
    this.saveProgress();
    
    if (window.scormAPI) {
      window.scormAPI.setCompleted();
    }
  }

  updateProgress() {
    const totalMoments = this.config.lecciones.reduce(
      (sum, lesson) => sum + lesson.moments.length, 
      0
    );
    const completed = this.completedMoments.size;
    const percentage = (completed / totalMoments) * 100;

    const progressBar = document.getElementById('progress-fill');
    if (progressBar) {
      progressBar.style.width = percentage + '%';
    }

    const progressText = document.getElementById('progress-text');
    if (progressText) {
      progressText.textContent = `${completed} de ${totalMoments} completados`;
    }

    // Update SCORM
    if (window.scormAPI) {
      window.scormAPI.setProgress(percentage);
    }
  }

  saveProgress() {
    const progress = {
      currentLesson: this.currentLesson,
      currentMoment: this.currentMoment,
      completed: Array.from(this.completedMoments)
    };
    localStorage.setItem('curso_progress', JSON.stringify(progress));
  }

  loadProgress() {
    const saved = localStorage.getItem('curso_progress');
    if (saved) {
      const progress = JSON.parse(saved);
      this.currentLesson = progress.currentLesson || 0;
      this.currentMoment = progress.currentMoment || 0;
      this.completedMoments = new Set(progress.completed || []);
    }
  }

  completarCurso() {
    alert('¡Felicitaciones! Has completado el curso.');
    if (window.scormAPI) {
      window.scormAPI.setCourseComplete();
    }
  }
}

// Inicializar cuando el DOM esté listo
if (typeof cursoConfig !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      window.navegacion = new CursoNavegacion(cursoConfig);
    });
  } else {
    window.navegacion = new CursoNavegacion(cursoConfig);
  }
}