import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {

  items: Item[]
  score: number

  itemOne: Item = new Item()
  itemTwo: Item = new Item()
  constructor() {
    this.setup()
  }

  ngOnInit() {
  }

  setup() {
    this.items = []
    this.score = 0
    for (let i = 0, set = Math.floor(Math.random() * 10000); i < 12; i++) {
      this.items.push({ id: i, match: set, flipped: false })
      i % 2 ? set++ : null
    }
    this.shuffle()
  }

  shuffle() {
    let temp = new Item()

    for (let i = this.items.length - 1, j = 0; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1))
      temp = this.items[i]
      this.items[i] = this.items[j]
      this.items[j] = temp
    }
  }

  selector(item) {
    if (this.itemOne.id == item.id || this.itemTwo.id == item.id || item.matched) {
      return
    }
    if (this.itemOne.flipped) {
      this.itemTwo = item
      this.itemTwo.flipped = true
      setTimeout(this.evaluate.bind(this), 2000)
    } else {
      this.itemOne = item
      this.itemOne.flipped = true
    }
  }

  evaluate() {
    if (this.itemOne.match == this.itemTwo.match) {
      this.itemOne.matched = true
      this.itemTwo.matched = true
      this.score += 10
    } else {
      this.score -= 2
      this.itemOne.flipped = false
      this.itemTwo.flipped = false
    }

  }

}

class Item {
  id: number
  flipped: boolean
  match: number
  matched: boolean
}