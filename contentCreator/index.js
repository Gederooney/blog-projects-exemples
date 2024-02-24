class Post {
  imagesClasses = {
    1: ['one'],
    2: ['two-1', 'two-2'],
    3: ['three-1', 'three-2', 'three-3'],
    4: ['four-1'],
    5: ['five-1', 'five-2'],
    6: ['six'],
  }
  medias = []
  rowsCount = 0
  postDescription = ''

  constructor() {
    this.editor = document.getElementById('editor')
    this.uploadImages = document.getElementById('upload-images')
    this.uploadVideos = document.getElementById('upload-videos')
    this.addEmojie = document.getElementById('add-emojie')
    this.dropzone = document.getElementById('dropzone-file')
    this.previewImages = document.getElementById('previewImages')
    this.previewDesc = document.getElementById('previewDescription')
    this.postDescription = ''

    this.handleInput = this.handleInput.bind(this)
    this.handleImageUpload = this.handleImageUpload.bind(this)
    this.handleVideoUplaod = this.handleVideoUplaod.bind(this)
    this.handleEmojie = this.handleEmojie.bind(this)
    this.handleFileUpload = this.handleFileUpload.bind(this)
    this.updatePreview = this.updatePreview.bind(this)
  }

  handleInput(event) {
    const target = event.target
    const { value } = target

    target.style.height = 'auto'
    const baseHeight = 100
    let newHeight = Math.max(target.scrollHeight, baseHeight)
    target.style.height = `${newHeight}px`

    this.postDescription = value.trim()
    this.updatePreview()
  }

  highlightHashtags(text) {
    return text
      .replace(
        /(\#\w+)/g,
        '<span style="color: rgb(37, 99, 235, 1); cursor:pointer;">$1</span>'
      )
      .replace(/\n/g, '<br />')
  }

  handleFileUpload(event) {
    const files = event.target.files
    this.medias = []
    const loadPromises = []
    for (let i = 0; i < files.length; i++) {
      const file = files[i]

      // Créez une nouvelle promesse pour chaque chargement de fichier
      const loadPromise = new Promise((resolve, reject) => {
        const reader = new FileReader()

        reader.onload = (e) => {
          const dataUri = e.target.result

          if (file.type.startsWith('image/')) {
            this.medias.push({
              type: 'image',
              dataUri: dataUri,
              file,
            })
          } else if (file.type.startsWith('video/')) {
            this.medias.push({
              type: 'video',
              dataUri: dataUri,
              file,
            })
          }

          // Résolvez la promesse après avoir chargé et traité le fichier
          resolve()
        }

        reader.onerror = reject

        reader.readAsDataURL(file)
      })

      // Ajoutez la promesse au tableau
      loadPromises.push(loadPromise)
    }

    Promise.all(loadPromises)
      .then(this.updatePreview)
      .catch((error) => {
        console.error("Erreur lors du chargement d'un fichier", error)
      })
  }

  handleImageUpload(event) {
    this.dropzone.setAttribute('accept', 'image/jpeg,image/png,image/webp')
    this.dropzone.setAttribute('multiple', 'true')

    this.dropzone.click()
  }
  handleVideoUplaod(event) {
    this.dropzone.setAttribute('accept', 'video/mp4,video/*')
    this.dropzone.removeAttribute('multiple')

    this.dropzone.click()
  }
  handleEmojie(event) {}

  getMediasHtml() {
    return ''
  }

  updatePreview() {
    if (this.postDescription.length > 0)
      this.previewDesc.innerHTML = this.highlightHashtags(this.postDescription)
    if (this.medias.length) {
      const classes = this.imagesClasses[this.medias.length]
      const style = classes[Math.floor(Math.random() * classes.length)]
      const html = this.getMediasHtml()

      console.log(classes, html, style)
    }
  }

  init() {
    this.editor.addEventListener('input', this.handleInput)
    this.addEmojie.addEventListener('click', this.handleEmojie)
    this.uploadVideos.addEventListener('click', this.handleVideoUplaod)
    this.uploadImages.addEventListener('click', this.handleImageUpload)
    this.dropzone.addEventListener('change', this.handleFileUpload)
  }
}

const post = new Post()

window.onload = post.init()
