import {Component, HostListener, OnInit, ViewEncapsulation} from '@angular/core';
// @ts-ignore
import FroalaEditor from 'froala-editor';

declare var $ :any;

@Component({
  selector: 'app-navbar',
  encapsulation:ViewEncapsulation.None,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public content:any = "Type something";

  public object: Object = {
    charCounterCount: true,
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat','smartphoneIcon','clear', 'insert_template'],
    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat','smartphoneIcon','clear','insert_template'],
    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat','smartphoneIcon','clear','insert_template'],
    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat','smartphoneIcon','clear','insert_template'],



  };


  constructor() { }

  ngOnInit(): void {

    FroalaEditor.DefineIcon("insert_template", {NAME: "plus", SVG_KEY: "add"});
    FroalaEditor.RegisterCommand('insert_template', {
      title: 'Hello',
      focus: false,
      undo: false,
      refreshAfterCallback: false,

      callback: () => {
        $("#selection_box").show()
      }
    });
    FroalaEditor.DefineIcon('clear', {NAME: 'remove', SVG_KEY: 'remove'});
    FroalaEditor.RegisterCommand('clear', {
      title: 'Clear HTML',
      focus: false,
      undo: true,
      refreshAfterCallback: true,
      callback: function () {
        this.html.set('');
        this.events.focus();
      }
    });
    FroalaEditor.DefineIconTemplate('material_design', '<i class="zmdi zmdi-[NAME]"></i>');
    FroalaEditor.DefineIcon('smartphoneIcon', {NAME: 'smartphone', template: 'material_design'});
    FroalaEditor.RegisterCommand('smartphoneIcon', {
      title: 'Edit Video',
      icon: 'smartphoneIcon',
      focus: false,
      undo: true,
      refreshAfterCallback: true,
      callback: function () {
        this.html.set('');
        this.events.focus();
      }
    });

  }

  saveContent(){
    console.log(this.content)

  }


  @HostListener('window:message', ['$event'])
  onMessage(e:any) {
    console.log(e)
    $("#selection_box").hide()

    this.content += e.data.message
    setTimeout(() => {
      this.updateSections()
    }, 1000)

  }
  updateSections() {
    $(".tempbutton").remove();

    $("body")
      .find("section")
      .each((index: any, section : any) => {
        if (index == 0) {
          $(section).before(
            `<div class="tempbutton">
    <div id="deleteSection` +
            index +
            `" class="tempbuttonsingleright">
      <i class="material-icons">
        delete
      </i>
    </div>
    </div>`
          );
        } else {
          $(section).before(
            `<div class="tempbutton">
    <div id="moveSection` +
            index +
            `" class="tempbuttonsingle">
      <i class="material-icons">
        keyboard_arrow_up
      </i>
    </div>
    <div id="deleteSection` +
            index +
            `" class="tempbuttonsingleright">
      <i class="material-icons">
        delete
      </i>
    </div>
    </div>`
          );
        }

        $(`#moveSection` + index).click((event:any) => {
          var elementbottom = $(event.currentTarget).parent().nextAll("section").first();
          var elementtop = $(event.currentTarget).parent().prevAll("section").first();
          elementtop.before(elementbottom);
          this.updateSections();
        });

        $(`#deleteSection` + index).click((event:any) => {
          $(event.currentTarget).parent().nextAll("section").first().remove();
          this.updateSections();
        });
      });

    $("body")
      .find("footer")
      .each((index: any, footer: any) => {
        $(footer).before(
          `<div class="tempbutton">
    <div id="deleteFooter` +
          index +
          `" class="tempbuttonsingleright">
      <i class="material-icons">
        delete
      </i>
    </div>
    </div>`
        );

        $(`#deleteFooter` + index).click((event: any) => {
          $(event.currentTarget).parent().nextAll("footer").first().remove();
          this.updateSections();
        });
      });
  }

}
