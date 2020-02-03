<template>
  <div>
    <el-dialog :visible.sync="opened" fullscreen title="Gerenciador de Mídias">
      <el-row style="margin-top:-30px;">
        <el-col :span="hasActiveImage ? 19 : 24">
          <el-tabs v-model="activeTab">
            <el-tab-pane label="Galeria" name="gallery">
              <el-row>
                <section style>
                  <el-col>
                    <div>
                      <ul class="gallery-elements">
                        <li
                          v-for="i in uploadCount"
                          v-show="isUploading"
                          :key="'loading_' + i"
                          class="gallery-element"
                        >
                          <!-- <div class="progress-bar-container">
                        <div class="progress-bar" style="width:50%;"/>
                          </div>-->
                          <div class="element-content">
                            <div class="spinner">
                              <div class="animation">
                                <div class="circle one"/>
                              </div>
                              <div class="animation">
                                <div class="circle two"/>
                              </div>
                              <div class="animation">
                                <div class="circle three"/>
                              </div>
                              <div class="animation">
                                <div class="circle four"/>
                              </div>
                              <div class="animation">
                                <div class="circle five"/>
                              </div>
                            </div>
                            <span>Loading...</span>
                          </div>
                        </li>
                        <!-- <li class="gallery-element">
                      <div class="element-content">
                        <i class="el-icon-document" aria-hidden="true"/>
                        <div class="clearfix"/>
                        <span>Document.pdf</span>
                      </div>
                        </li>-->
                        <li
                          v-for="(item, index) in fileList"
                          :key="index"
                          :class="'gallery-element ' + isActive(item.id)"
                          @click="setActiveImage(item)"
                        >
                          <div class="element-content thumbnail">
                            <img :src="item.url" :alt="item.title">
                          </div>
                        </li>
                      </ul>
                    </div>
                  </el-col>
                </section>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="Upload" name="upload">
              <el-row>
                <form enctype="multipart/form-data" style="padding-right:20px" novalidate>
                  <div class="dropbox">
                    <input
                      :name="uploadFieldName"
                      :disabled="isUploading"
                      type="file"
                      multiple
                      accept="image/*"
                      class="input-file"
                      @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length"
                    >
                    <p v-if="!isUploading">Arraste e solte os arquivos aqui
                      <br>Ou Clique para procurar
                    </p>
                  </div>
                </form>
              </el-row>
            </el-tab-pane>
          </el-tabs>
        </el-col>
        <el-col v-if="hasActiveImage" :span="5">
          <el-card class="box-card-component" style="margin-top:40px;">
            <div slot="header" class="box-card-header">
              <img
                :src="activeImage.url"
                class="image"
                style="margin-left:auto;margin-right:auto;width:100%;height:100%;max-width:350px;"
              >
            </div>
            <span>{{ formatSize(activeImage.size) }}</span>
            <el-row>
              <el-form v-model="activeImage" label-position="left">
                <el-form-item label="Título">
                  <el-input v-model="activeImage.original_name"/>
                </el-form-item>
                <el-form-item label="URL">
                  <el-input v-model="activeImage.url" readonly/>
                </el-form-item>
                <el-button type="primary" style="width:60%" @click.prevent="use">Usar esta</el-button>
                <el-button type="danger" style="width:25%" @click.prevent="destroyImage">
                  <i class="el-icon-delete"/>
                </el-button>
              </el-form>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { formatBytes } from '@/utils'
export default {
  name: 'MediaManager',

  props: {
    visibility: {
      required: true,
      default: false,
      type: Boolean
    },
    image: {
      type: Object | null,
      default: null,
      required: true
    }
  },

  data() {
    return {
      opened: false,
      activeTab: 'gallery',
      uploadError: null,
      uploadFieldName: 'images',
      uploadCount: 0,
      isUploading: false,
      activeImage: this.image ? Object.assign({}, this.image) : {}
    }
  },

  computed: {
    ...mapGetters({
      images: 'images'
    }),
    fileList() {
      return [...this.images.data]
    },
    hasActiveImage() {
      return this.activeImage && this.activeImage.id
    }
  },

  watch: {
    visibility(val) {
      if (val) {
        this.opened = true
        this.$emit('update:visibility', true)
      } else {
        this.opened = false
        this.$emit('update:visibility', false)
      }
    },
    opened(val) {
      if (val) {
        this.$emit('update:visibility', true)
      } else {
        this.$emit('update:visibility', false)
      }
    }
  },

  created() {
    this.getImages()
  },

  mounted() {
    this.reset()
  },

  methods: {
    getImages() {
      return this.$store.dispatch('getImages')
    },

    reset() {
      // reset form to initial state
      this.uploadError = null
    },

    save(formData) {
      // upload data to the server
      this.isUploading = true
      this.activeTab = 'gallery'
      this.$store
        .dispatch('uploadImages', formData)
        .then(uploaded => {
          this.uploadCount = 0
          this.isUploading = false
        })
        .catch(err => {
          this.uploadCount = 0
          this.isUploading = false
          this.uploadError = err.response
        })
    },

    filesChange(fieldName, fileList) {
      // handle file changes
      const formData = new FormData()
      if (!fileList.length) return
      // append the files to FormData
      Array.from(Array(fileList.length).keys()).map(x => {
        formData.append(fieldName, fileList[x], fileList[x].name)
      })
      this.uploadCount = fileList.length
      // save it
      this.save(formData)
    },

    isActive(id) {
      return this.activeImage && this.activeImage.id === id ? 'active' : ''
    },

    setActiveImage(image) {
      this.activeImage && this.activeImage.id === image.id
        ? (this.activeImage = {})
        : (this.activeImage = image)
    },

    formatSize(bytes) {
      return formatBytes(bytes)
    },

    use() {
      this.$store.dispatch('updateImage', this.activeImage)
      this.opened = false
      this.$emit('selectImage', this.activeImage)
    },

    destroyImage() {
      this.$store.dispatch('destroyImage', this.activeImage.id).then(() => {
        this.$message({
          message: 'Deletado com sucesso!',
          type: 'warning',
          showClose: true,
          duration: 1000
        })
        this.activeImage = {}
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.dropbox {
  outline: 2px dashed grey; /* the dash box */
  outline-offset: -20px;
  color: dimgray;
  box-sizing: border-box;
  min-height: 350px; /* minimum height */
  position: relative;
  max-width: 100%;
  cursor: pointer;
}

.input-file {
  opacity: 0; /* invisible but it's there! */
  width: 100%;
  height: 400px;
  position: absolute;
  cursor: pointer;
}

.dropbox:hover {
  background: lightblue; /* when mouse over to the drop zone, change color */
}

.dropbox p {
  font-size: 1.2em;
  text-align: center;
  vertical-align: middle;
  padding: 30vh 0px;
}
</style>

<style scoped>
/**
* MODULES
**/
*,
*:before,
*:after {
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.loader {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  z-index: 999;
  display: flex;
}
.loader .loader-content {
  margin: auto;
  text-align: center;
}
.loader .loader-content span {
  margin-top: 20px;
  font-size: 19px;
  display: block;
}
.progress-bar-container {
  position: relative;
  background-color: #eaeaea;
  left: 0;
  top: 0;
  margin: 0;
  width: 100%;
  height: 5px;
}
.progress-bar-container .progress-bar {
  background: #71ba51;
  overflow: hidden;
  position: absolute;
  height: 5px;
  min-width: 0;
}

/**
* Based on GyniCSS, by Gynidark.
* https://github.com/Gynidark/GyniCSS/blob/master/assets/sass/modules/_btn.scss
**/

.gallery-elements .gallery-element {
  cursor: pointer;
  background: whitesmoke;
  width: 140px;
  height: 140px;
  float: left;
  margin: 10px;
  border: 1px solid #ddd;
  overflow: hidden;
}
.gallery-elements .gallery-element.active {
  border: 4px solid #146db1;
}
.gallery-elements .gallery-element .element-content {
  text-align: center;
  height: 140px;
  font-size: 16px;
  padding: 10px;
  padding-top: 30%;
}
.gallery-elements .gallery-element .element-content.thumbnail {
  padding: 0 !important;
}
.gallery-elements .gallery-element .element-content * {
  display: block;
  margin: auto;
}
.gallery-elements .gallery-element .element-content img {
  height: 100%;
  width: auto;
  display: inline-block;
}
</style>

