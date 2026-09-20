/**
 * Signify Haptic Feedback Engine ("Silent Physical Confirmation")
 * 
 * Provides tactile haptic feedback for deaf/non-vocal users to confirm sign recognition
 * and safety-gating without requiring them to break eye contact with the person opposite.
 * 
 * Includes:
 * 1. Physical hardware vibration via navigator.vibrate()
 * 2. Visual ripple pulse dispatch for on-screen phone chassis animation
 * 3. Subtle synthesized tactile audio tick for desktop / laptop hackathon judges
 */

export type HapticType = 'success' | 'uncertain' | 'broadcast' | 'click';

export interface HapticEventDetail {
  type: HapticType;
  pattern: string;
  label: string;
  timestamp: number;
}

class HapticService {
  private enabled: boolean = true;
  private audioCtx: AudioContext | null = null;

  constructor() {
    // Lazy audio context initialization
  }

  private initAudio() {
    if (!this.audioCtx && typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        try {
          this.audioCtx = new AudioContextClass();
        } catch (e) {
          console.warn('AudioContext not available for haptic sound:', e);
        }
      }
    }
  }

  /**
   * Play a subtle acoustic haptic tick so desktop judges can hear the physical vibration rhythm
   */
  private playTactileTick(frequency: number = 180, durationMs: number = 35) {
    try {
      this.initAudio();
      if (!this.audioCtx) return;
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(frequency, this.audioCtx.currentTime);

      gain.gain.setValueAtTime(0.2, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + durationMs / 1000);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + durationMs / 1000);
    } catch {
      // Ignore audio failure
    }
  }

  private dispatchEvent(detail: HapticEventDetail) {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('signify-haptic', { detail }));
    }
  }

  public setEnabled(val: boolean) {
    this.enabled = val;
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  /**
   * 1 Crisp Pulse: Sign Confirmed (>90% confidence)
   */
  public triggerSuccess(): void {
    if (!this.enabled) return;

    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(45);
      } catch {}
    }

    this.playTactileTick(190, 40);

    this.dispatchEvent({
      type: 'success',
      pattern: '1 Crisp Pulse (45ms)',
      label: 'Sign Confirmed (>90%)',
      timestamp: Date.now(),
    });
  }

  /**
   * 2 Quick Pulses: Low Confidence / Safety Gate Retry
   */
  public triggerUncertain(): void {
    if (!this.enabled) return;

    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate([35, 50, 35]);
      } catch {}
    }

    this.playTactileTick(120, 30);
    setTimeout(() => this.playTactileTick(120, 30), 80);

    this.dispatchEvent({
      type: 'uncertain',
      pattern: '2 Quick Pulses (35ms, 50ms, 35ms)',
      label: 'Low Confidence (Retry Sign)',
      timestamp: Date.now(),
    });
  }

  /**
   * Long Wave Pulse: Full Message Broadcasted Out Loud
   */
  public triggerBroadcast(): void {
    if (!this.enabled) return;

    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate([80, 40, 80]);
      } catch {}
    }

    this.playTactileTick(240, 70);
    setTimeout(() => this.playTactileTick(280, 80), 110);

    this.dispatchEvent({
      type: 'broadcast',
      pattern: 'Long Pulse (80ms + 80ms)',
      label: 'Message Spoken via Loudspeaker',
      timestamp: Date.now(),
    });
  }

  /**
   * Light Tap for UI interactions
   */
  public triggerClick(): void {
    if (!this.enabled) return;
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(20);
      } catch {}
    }
    this.playTactileTick(220, 20);
  }
}

export const hapticService = new HapticService();
