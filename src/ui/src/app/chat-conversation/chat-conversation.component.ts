import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  signal,
  viewChild,
  viewChildren,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideBot,
  lucideBrain,
  lucideRefreshCw,
  lucideSendHorizontal,
} from '@ng-icons/lucide';
import {
  BrnAlertDialogContentDirective,
  BrnAlertDialogTriggerDirective,
} from '@spartan-ng/brain/alert-dialog';
import { BrnSeparatorComponent } from '@spartan-ng/brain/separator';
import {
  HlmAlertDialogActionButtonDirective,
  HlmAlertDialogCancelButtonDirective,
  HlmAlertDialogComponent,
  HlmAlertDialogContentComponent,
  HlmAlertDialogDescriptionDirective,
  HlmAlertDialogFooterComponent,
  HlmAlertDialogHeaderComponent,
  HlmAlertDialogTitleDirective,
} from '@spartan-ng/ui-alertdialog-helm';
import { HlmBadgeDirective } from '@spartan-ng/ui-badge-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import {
  HlmCardContentDirective,
  HlmCardFooterDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm';
import { HlmToasterComponent } from '@spartan-ng/ui-sonner-helm';

import {
  BrnPopoverComponent,
  BrnPopoverContentDirective,
  BrnPopoverTriggerDirective,
} from '@spartan-ng/brain/popover';
import {
  HlmAlertDescriptionDirective,
  HlmAlertDirective,
} from '@spartan-ng/ui-alert-helm';
import { HlmFormFieldModule } from '@spartan-ng/ui-formfield-helm';
import { HlmIconDirective } from '@spartan-ng/ui-icon-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { HlmPopoverContentDirective } from '@spartan-ng/ui-popover-helm';
import { HlmScrollAreaDirective } from '@spartan-ng/ui-scrollarea-helm';
import { HlmSeparatorDirective } from '@spartan-ng/ui-separator-helm';
import { HlmSwitchComponent } from '@spartan-ng/ui-switch-helm';
import { MarkdownComponent, provideMarkdown } from 'ngx-markdown';
import { AccordionPreviewComponent } from '../components/accordion/accordion.component';
import { SkeletonPreviewComponent } from '../components/skeleton-preview/skeleton-preview.component';
import { ChatService } from './chat-conversation.service';

const SAMPLE_PROMPT_1 = `Hallo! Ich plane eine Reise nach Island und würde gerne deine Expertise nutzen, um eine individuelle Reiseroute zu erstellen. Bitte nutze deine Tools zur Planung des Reiseziels und deine internen Ressourcen, um einen Tagesplan zu erstellen, der auf folgenden Punkten basiert:
	- Die wichtigsten Natursehenswürdigkeiten (Gletscher, Wasserfälle, geothermische Orte usw.)
	- Einzigartige lokale Erlebnisse (Kultur, Essen, verborgene Schätze)
	- Effiziente Reiserouten und realistische Zeitplanung
	- Eine Mischung aus Abenteuer und Entspannung

Ich strebe eine Reiseroute an, die ein Gleichgewicht zwischen landschaftlicher Erkundung und Komfort bietet. Du kannst deine Empfehlungen gerne auf die beste Reisezeit und die Logistik vor Ort abstimmen. Vielen Dank!`;

const SAMPLE_PROMPT_2 = `Hallo! Ich hätte gerne Unterstützung bei der Planung einer Reise nach Island. Ich bin auf der Suche nach Vorschlägen für Reiseziele und eine komplette Reiseroute, die auf ein unvergessliches Erlebnis zugeschnitten ist. Bitte nutzen deine Planungstools und dein Wissen über Reiseziele und Empfehlungen:
	- Wohin soll ich reisen und warum?
	- Was man jeden Tag unternehmen sollte (einschließlich einzigartiger Erlebnisse oder Erlebnisse abseits der bekannten Routen und Pfade)
	- Wie man sich am besten fortbewegt und wo man übernachtet

Ich bin offen für alle Arten von Abenteuern - egal, ob es darum geht, Wasserfälle zu erklimmen, in heißen Quellen zu baden oder kleine isländische Städte zu entdecken. Eine kreative Reiseroute mit Hilfe deiner Tools wäre fantastisch!`;

const SAMPLE_PROMPT_3 = `Ich plane eine Reise nach Marokko und würde mich über eine vollständige, toolgestützte Reiseroute freuen.
Bitte verwende deine Reiseplanungssysteme, um wichtige Ziele, tägliche Aktivitäten und eine logische Route zu empfehlen.
Ich wünsche mir ein ausgewogenes Erlebnis, das kulturelle Sehenswürdigkeiten, Naturlandschaften und Zeit zum Entspannen umfasst.
Effiziente Reiselogistik und saisonale Erwägungen sollten ebenfalls berücksichtigt werden.

Reisedaten: so bald wie möglich.
Startpunkt: Paris, Frankreich.
Dauer der Reise: 10 Tage.
Budget: 5000 Euro.
`;

@Component({
  selector: 'app-chat-conversation',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgIcon,
    JsonPipe,
    AsyncPipe,
    HlmButtonDirective,
    HlmInputDirective,
    HlmFormFieldModule,
    HlmCardHeaderDirective,
    HlmCardContentDirective,
    HlmCardFooterDirective,
    HlmCardTitleDirective,
    HlmScrollAreaDirective,
    HlmIconDirective,
    HlmBadgeDirective,
    BrnPopoverComponent,
    BrnPopoverTriggerDirective,
    BrnPopoverContentDirective,
    HlmPopoverContentDirective,
    BrnAlertDialogTriggerDirective,
    BrnAlertDialogContentDirective,
    HlmAlertDialogComponent,
    HlmAlertDialogContentComponent,
    HlmAlertDialogHeaderComponent,
    HlmAlertDialogFooterComponent,
    HlmAlertDialogTitleDirective,
    HlmAlertDialogDescriptionDirective,
    HlmAlertDialogActionButtonDirective,
    HlmAlertDialogCancelButtonDirective,
    HlmAlertDirective,
    HlmAlertDescriptionDirective,
    HlmToasterComponent,
    HlmSeparatorDirective,
    BrnSeparatorComponent,
    HlmLabelDirective,
    HlmSwitchComponent,
    AccordionPreviewComponent,
    SkeletonPreviewComponent,
    MarkdownComponent,
  ],
  providers: [
    provideMarkdown(),
    provideIcons({
      lucideBrain,
      lucideBot,
      lucideSendHorizontal,
      lucideRefreshCw,
    }),
  ],
  templateUrl: './chat-conversation.component.html',
  styleUrl: './chat-conversation.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatConversationComponent implements OnInit {
  agents = signal<{}>({});
  eot = viewChild<ElementRef<HTMLElement>>('eot');
  agentMessages = viewChildren<ElementRef<HTMLElement>>('agentMessages');
  samplePrompts = [SAMPLE_PROMPT_1, SAMPLE_PROMPT_2, SAMPLE_PROMPT_3];

  constructor(public chatService: ChatService) {
    this.chatService.messagesStream.subscribe((messages) => {
      if (messages.length === 0) return;
      setTimeout(() => {
        this.scrollToBottom();
      }, 0);
    });
  }

  async ngOnInit() {
    this.resetChat();
    await this.chatService.fetchAvailableTools();
  }

  @HostListener('window:keyup.shift.enter', ['$event'])
  sendMessage(event: any) {
    event.preventDefault();
    this.chatService.sendMessage(event);
  }

  scrollToBottom() {
    this.eot()?.nativeElement.scrollIntoView({
      behavior: 'smooth',
    });
  }

  toggleTool() {}

  cancelReset(ctx: any) {
    ctx.close();
  }

  confirmReset(ctx: any) {
    ctx.close();
    this.resetChat();
  }

  private resetChat() {
    this.chatService.resetChat();
  }
}
