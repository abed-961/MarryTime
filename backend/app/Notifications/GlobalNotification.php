<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class GlobalNotification extends Notification
{
    use Queueable;

     use Queueable;

    protected $message;
    protected $status;
    protected $readed_it;

    /**
     * Create a new notification instance.
     */
    public function __construct($message, $status = 'info', $readed_it = false)
    {
        $this->message = $message;
        $this->status = $status;
        $this->readed_it = $readed_it;
    }

    /**
     * Channels through which the notification is sent.
     */
    public function via($notifiable)
    {
        return ['database', 'broadcast'];
    }

    /**
     * Store data in the database.
     */
    public function toArray($notifiable)
    {
        return [
            'user_id'   => $notifiable->id,
            'message'   => $this->message,
            'status'    => $this->status,
            'readed_it' => $this->readed_it,
        ];
    }

    /**
     * Broadcast data for real-time notifications.
     */
    public function toBroadcast($notifiable)
    {
        return new BroadcastMessage([
            'user_id'   => $notifiable->id,
            'message'   => $this->message,
            'status'    => $this->status,
            'readed_it' => $this->readed_it,
        ]);
    }

    /**
     * The channel name used for broadcasting.
     */
    public function broadcastOn()
    {
        return ['notifications']; // Angular can subscribe to this channel
    }

    /**
     * The broadcast event name.
     */
    public function broadcastAs()
    {
        return 'new-notification';
    }
}
