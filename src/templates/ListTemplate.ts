import FullList from "../model/FullList";

interface DOMList {
  ul: HTMLUListElement;
  clear(): void;
  render(fullList: FullList): void;
}

export default class ListTemplate implements DOMList {
  ul: HTMLUListElement;

  static instance: ListTemplate = new ListTemplate();

  private constructor() {
    this.ul = document.getElementById("listItems") as HTMLUListElement;
  }

  clear(): void {
    this.ul.innerHTML = "";
  }

  render(fullList: FullList): void {
    this.clear();

    fullList.list.forEach(({ id, item, checked }, index) => {
      const li = document.createElement("li") as HTMLLIElement;
      li.className = "item";

      const check = document.createElement("input") as HTMLInputElement;
      check.type = "checkbox";
      check.id = id;
      check.tabIndex = index;
      check.checked = checked;
      li.append(check);

      check.addEventListener("change", () => {
        fullList.list[index].checked = !fullList.list[index].checked; // Destructuring removes the indexing to the original array
        fullList.save();
      });

      const label = document.createElement("label");
      label.htmlFor = id;
      label.textContent = item;
      li.append(label);

      const button = document.createElement("button") as HTMLButtonElement;
      button.className = "button";
      button.textContent = "X";
      li.append(button);

      button.addEventListener("click", () => {
        fullList.removeItem(id);
        this.render(fullList);
      });

      this.ul.append(li);
    });
  }
}
