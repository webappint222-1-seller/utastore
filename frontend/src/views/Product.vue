<template>
  <div class="pt-4 font-mono flex justify-center items-center text-lg">Our Products:</div>
  <div class="showresultp">
    <div class="showResult">
      <ul v-for="form in formResults" :key="form.id">
        <bor-der>
          <li>
            <div>
              <img class="md:h-60 w-auto pb-2" :src="`${this.url}/Product/image/${form.product_id}/${form.path}`"/>
            </div>

            <p class="font-mono text-sm">Brand: {{ form.brand.brand_Name }}</p>

            <p class="font-mono text-sm">Model: {{ form.product_Name }}</p>

            <p class="font-mono text-sm">Spec: {{ form.description }}</p>

            <p
              v-for="colorName in form.colors"
              :key="colorName.color_Id"
              class="font-mono text-sm"
            >Color: {{ colorName.color_Name }}</p>

            <p class="font-mono text-sm">Price: {{ form.price }}</p>

            <p class="font-mono text-sm">Manufacture: {{ form.date }}</p>                

            <button @click="showFormResults(form)"  class="editIcon">
              <img src="../assets/pencil.png" />
            </button>

            <button @click="deleteFormResults(form.product_id)" class="deleteIcon">
              <img src="../assets/xmark.png" />
            </button>
          </li>
        </bor-der>
      </ul>
    </div>
  </div>

  <li-ne></li-ne>

  <button v-show="!addedit" v-on:click="toggleDone()" class="addeditbutton">Add/Edit</button>
  <div v-show="addedit">
    <button v-on:click="toggleDone()" class="cancelbuttontop ">Cancel</button>
    <div class="addeditp">
      <form @submit.prevent="submitForm">
        <bor-der>
          <div class="body">
            <label class="mt-2">Product Name:</label>
            <input
              type="text"
              id="nameForm"
              v-model="nameForm"
              @blur="validateNameForm"
              class="mt-2 h-8 w-80 rounded border-black border-2"
            />
            <p v-if="invalidNameForm" class="text-black pt-4">
              <b class="text-lightpink bg-black">Please write something!!!</b>
            </p>

            <label class="mt-2">Manufactured Date:</label>
            <input
              type="date"
              id="dateForm"
              v-model="dateForm"
              @blur="validateDateForm"
              class="mt-2 h-8 w-80 rounded border-black border-2"
            />
            <p v-if="invalidDateForm" class="text-black pt-4">
              <b class="text-lightpink bg-black">Please choose something!!!</b>
            </p>

            <label class="mt-2">Product Description:</label>
            <textarea
              id="desForm"
              v-model="desForm"
              @blur="validateDesForm"
              class="mt-2 h-8 w-80 rounded border-black border-2"
            ></textarea>

            <p v-if="invalidDesForm" class="text-black pt-4">
              <b class="text-lightpink bg-black">Please write something!!!</b>
            </p>

            <label class="mt-2">Brand:</label>
            <select
              id="brandForm"
              v-model="brandForm"
              @blur="validateBrandForm"
              class="mt-2 h-8 w-80 rounded border-black border-2"
            >
              <option disabled value>Please select one</option>
              <!-- <option id="1">Corsair</option>
              <option id="2">Gskill</option>
              <option id="3">Kingston</option>-->

              <option
                :value="brand"
                v-for="brand in brandList"
                :key="brand.id"
              >{{ brand.brand_Name }}</option>
            </select>

            <p v-if="invalidBrandForm" class="text-black pt-4">
              <b class="text-lightpink bg-black">Please choose something!!!</b>
            </p>

            <!-- <div class="grid grid-cols-3"> -->
              <label class="mt-2">Color:</label>
              <div class="" v-for="color in colorList" :key="color.id">
                <input
                  type="checkbox"
                  :id="color.color"
                  name="color"
                  :value="color"
                  v-model="selectColor"
                  @blur="validateColorForm"
                  class="mr-2 mt-2 h-4 w-4 justify-self-center"
                />
                <label :for="color.color" >{{ color.color_Name }}</label>
              </div>
              <!-- <label class="mt-2">Color:</label>
            <input
              type="checkbox"
              id="black"
              value="Black"
              class="h-4 w-4 mt-2"
              v-model="selectColor"
              @blur="validateColorForm"
            />
            <label for="black" class="text-white bg-black border border-black rounded p-1 m-2">Black</label>
            <input
              type="checkbox"
              id="white"
              value="White"
              class="h-4 w-4"
              v-model="selectColor"
              @blur="validateColorForm"
            />
            <label for="white" class="bg-white border border-black rounded p-1 m-2">White</label>
            <input
              type="checkbox"
              id="silver"
              value="Silver"
              class="h-4 w-4"
              v-model="selectColor"
              @blur="validateColorForm"
            />
            <label for="silver" class="bg-silver border border-black rounded p-1 m-2">Silver</label>
            
            <span>Selected color:</span>
              <span> {{ selectColor }}</span>
            -->
              <p v-if="invalidColorForm" class="text-black pt-4">
                <b class="text-lightpink bg-black">Please choose something!!!</b>
              </p>
            <!-- </div> -->

            <label class="mt-2">Product Price:</label>
            <input
              type="text"
              id="priceForm"
              v-model="priceForm"
              @blur="validatePriceForm"
              class="mt-2 h-8 w-80 rounded border-black border-2"
            />
            <p v-if="invalidPriceForm" class="text-black pt-4">
              <b class="text-lightpink bg-black">Please write something!!!</b>
            </p>

            <label class="mt-2">Product images:</label>
            <input
              type="file"
              id="fileForm"
              v-on:click="fileForm"
              @blur="validateFileForm"
              @change="uploadPhoto"
              class="mt-2 h-8 w-80 rounded border-black border-2"
            />

            <p v-if="invalidFileForm" class="text-black pt-4">
              <b class="text-lightpink bg-black">Please choose something!!!</b>
            </p>

            <img :src="i" class="h-20 w-40 object-cover border-2 border-black rounded my-4" />
          </div>

          <div class="flex justify-center items-center">
            <button class="submitbutton" @click="validForm">Submit</button>
            <button v-on:click="toggleDone()" class="cancelbuttondown">Cancel</button>
          </div>
        </bor-der>
      </form>
    </div>
  </div>
</template>
  
<script>


export default {

  components: {

  },

  data() {
    return {
      addedit: false,
      nameForm: '',
      desForm: '',
      dateForm: Date,
      brandForm: null,
      priceForm: '',
      invalidNameForm: false,
      invalidDesForm: false,
      invalidBrandForm: false,
      invalidColorForm: false,
      invalidDateForm: false,
      invalidPriceForm: false,
      invalidFileForm: false,
      formResults: [],
      brandList: [],
      colorList: [],
      selectColor: [],
      fileForm: null,
      showSelectResult: null,
      i: 'https://files.catbox.moe/vq3v5e.png',
      editForm: false,
      editFormId: '',
      url: 'https://utastore:3006'
      //url: 'http://localhost:4000/formResults'
    }
  },

  methods: {
    uploadPhoto(p) {
      const varFile = p.target.files[0]
      //console.log(this.fileForm)
      if (varFile.type.includes('image')) {
        const readImage = new FileReader()
        readImage.onload = (e) => {
          this.i = e.target.result
        }
        this.fileForm = varFile
        readImage.readAsDataURL(varFile)
      }
    },



    toggleDone() {
      this.addedit = !this.addedit
    },

    submitForm() {
      this.invalidNameForm = this.nameForm === '' ? true : false
      this.invalidDesForm = this.desForm === '' ? true : false
      this.invalidBrandForm = this.brandForm === null ? true : false
      this.invalidColorForm = this.selectColor === null ? true : false
      this.invalidDateForm = this.dateForm === Date ? true : false
      this.invalidPriceForm = this.priceForm === '' ? true : false
      //this.invalidFileForm = this.fileForm === null ? true : false
      console.log(`nameform: ${this.nameForm}
                  desform: ${this.desForm}
                  brandform: ${this.brandForm}
                  selectColor: ${this.selectColor}
                  dateForm: ${this.dateForm}
                  priceForm: ${this.priceForm}
                  fileForm: ${this.fileForm}`)

      if (this.nameForm !== '' &&
        this.desForm !== '' &&
        this.brandForm !== null &&
        this.selectColor !== [] &&
        this.dateForm !== Date &&
        this.priceForm !== ''
      ) {
        //this.formResults.push({
        //name: this.form,
        //description: this.form2
        //})

        //Edit-2
        if (this.editForm) {
          this.editFormResults({

          })
        }
        else {
          //Post-2
          this.addForm({
            product_Name: this.nameForm,
            description: this.desForm,
            brand: this.brandForm,
            colors: this.selectColor,
            date: this.dateForm,
            price: this.priceForm

          })
        }
      }
      this.nameForm = '',
        this.desForm = '',
        this.brandForm = null,
        this.selectColor = [],
        this.dateForm = Date,
        this.priceForm = ''

      //console.log(`name: ${this.formResults[0].name} description: ${this.formResults[0].description}`)
    },

    validateNameForm() {
      this.invalidNameForm = this.nameForm === '' ? true : false
    },

    validateDesForm() {
      this.invalidDesForm = this.desForm === '' ? true : false
    },

    validateBrandForm() {
      this.invalidBrandForm = this.brandForm === null ? true : false
    },

    validateColorForm() {
      this.invalidColorForm = this.selectColor === [] ? true : false
    },

    validateDateForm() {
      this.invalidDateForm = this.dateForm === Date ? true : false
    },

    validatePriceForm() {
      this.invalidPriceForm = this.priceForm === '' ? true : false
    },

    validateFileForm() {
      this.invalidFileForm = this.fileForm !== null ? true : false
    },

    validForm() {
      if (this.invalidNameForm &&
        this.invalidDesForm &&
        this.invalidBrandForm &&
        this.invalidColorForm &&
        this.invalidDateForm &&
        this.invalidPriceForm &&
        this.invalidFileForm) {
        return
      }
      alert("Submit Complete")
    },

    //Post
    async addForm() {

      const inputData =
        JSON.stringify({
          product_Name: this.nameForm,
          date: this.dateForm,
          description: this.desForm,
          brand: this.brandForm,
          colors: this.selectColor,
          price: this.priceForm,
          path: this.fileForm.name
        })

      const formData = new FormData()
      formData.append('file', this.fileForm, this.fileForm.name)
      formData.append('product', inputData)


      try {
        const res = await fetch(this.url + "/Product/multi", {
          method: 'POST',
          body: formData
        })
        const resdata = await res.json()
        this.formResults = [...this.formResults, resdata]
      }
      catch (error) {
        console.log(`addForm False!!! ${error}`)
      }
    },

    //Get
    async getFormResults() {
      try {
        const res = await fetch(this.url + "/Product" )
        const resdata = await res.json()
        return resdata
      }
      catch (error) {
        console.log(`getFormResults False!!! ${error}`)
      }
    },

    async getBrandList() {
      try {
        const res = await fetch(this.url + "/Brand")
        const resbrandlist = await res.json()
        return resbrandlist
        
      }
      catch (error) {
        console.log(`brandList False!!! ${error}`)
      }
    },

    async getColorList() {
      try {
        const res = await fetch(this.url + "/Color" )
        const rescolorlist = await res.json()
        return rescolorlist
      }
      catch (error) {
        console.log(`colorList False!!! ${error}`)
      }
    },

    //Delete
    async deleteFormResults(id) {
      try {
        await fetch(`${this.url}/Product/delete/ + ${id}`, {
          method: 'DELETE'
        })
        this.reload()
      }
      catch (error) {
        console.log(`deleteEncourageResults False!!! ${error}`)
      }
    },

    //Edit
    showFormResults(beforeForm) {
      this.editForm = true
      this.editFormId = beforeForm.id
      this.nameForm = beforeForm.product_Name
      this.desForm = beforeForm.description
      this.brandForm = beforeForm.brand
      this.dateForm = beforeForm.date
      this.priceForm = beforeForm.price
      this.selectColor = beforeForm.colors
      this.showSelectResult = beforeForm     
      // console.log(`showSelectResult!!! ` + this.showSelectResult.product_id) 
    },

    async editFormResults() {

      const editedData =
        JSON.stringify({
          product_Name: this.nameForm,
          date: this.dateForm,
          description: this.descriptionForm,
          brand: this.brandForm,
          colors: this.selectColor,
          price: this.priceForm,
          // path: this.fileForm.name
        })

      const formData = new FormData()
      // formData.append('file', this.fileForm, this.fileForm.name)
      formData.append('newproduct', editedData)

      try {
        await fetch(`${this.url}/Product/ + ${this.showSelectResult.product_id}`, {
          method: 'PUT',

          body: formData
        })        
        this.reload()

        this.editForm = false,
          this.editFormId = '',
          this.nameForm = '',
          this.desForm = '',
          this.brandForm = null,
          this.selectColor = [],
          this.dateForm = Date,
          this.priceForm = ''

      }
      catch (error) {
        console.log(`editFormResults False!!! ${error}`)
      }
    },

    async reload() {
    this.formResults = await this.getFormResults()    
  }

  },

  //Get-2
  async created() {
    this.formResults = await this.getFormResults()
    this.brandList = await this.getBrandList()
    this.colorList = await this.getColorList()
  }
}
</script>