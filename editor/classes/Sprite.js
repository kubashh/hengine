const SPRITE = {
  defaultPath: `files.engineAssets.tempImage`,

  sprite: createSection(
    `Sprite`,
    [
      createValueInput(
        createHtmlElement({
          text: `Color`,
        }),
        createHtmlElement({
          name: `input`,
          id: `spriteInput`,
          text: `Color`,
        })
      ),
      createValueInput(
        createHtmlElement({
          text: `Image Path`,
        }),
        createHtmlElement({
          name: `input`,
          id: `imagePathInput`,
          text: `Path`,
        })
      ),
    ],
    () => {
      delete selectedObject.sprite
      refreshInspector()
    }
  ),

  addSprite: createHtmlElement({
    text: `Add Sprite`,
    className: `addNewComponent`,
    onclick: () => {
      SPRITE.set()
    },
  }),

  add(componentDiv, addComponentDiv) {
    componentDiv.appendChild(this.sprite)
    if (!selectedObject?.sprite) {
      this.sprite.style.display = `none`
    } else {
      this.addSprite.style.display = `none`
    }

    addComponentDiv.appendChild(this.addSprite)
  },

  refresh() {
    if (selectedObject.sprite) {
      document.getElementById(`spriteInput`).value = selectedObject.sprite.color
      document.getElementById(`imagePathInput`).value =
        selectedObject.sprite.imagePath
      this.sprite.style.display = `block`
      this.addSprite.style.display = `none`
    } else {
      document.getElementById(`spriteInput`).value = `blue`
      document.getElementById(`imagePathInput`).value = this.defaultPath
      this.sprite.style.display = `none`
      this.addSprite.style.display = `block`
    }
  },

  update() {
    if (selectedObject.sprite) {
      selectedObject.sprite.color = document.getElementById(`spriteInput`).value
      selectedObject.sprite.imagePath =
        document.getElementById(`imagePathInput`).value
    }
  },

  set() {
    selectedObject.sprite = {
      color: `blue`,
      width: 1,
      height: 1,
      imagePath: this.defaultPath,
    }
  },
}
